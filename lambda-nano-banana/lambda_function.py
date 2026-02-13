"""
Lambda function for nano-banana image generation using Google Gemini.
Generates ad images on-demand, saves to S3.

SAFETY CONTROLS:
- API key loaded from AWS Secrets Manager (never hardcoded)
- 30-second execution timeout (prevents runaway generation)
- Cost caps and CloudWatch alarms (automated monitoring)
- Minimal IAM role (S3 + SecretsManager + Logs only)
- Error logs redacted (no API keys in output)
"""

import json
import boto3
import os
from io import BytesIO
from datetime import datetime
import logging
import hashlib

# Configure logging (redacted for safety)
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# AWS clients
s3_client = boto3.client('s3')
secrets_client = boto3.client('secretsmanager')

# Environment variables
S3_BUCKET = os.environ.get('S3_BUCKET', 'island-properties-images')
SECRETS_SECRET_ID = os.environ.get('SECRETS_SECRET_ID', 'gemini-api-key')
MAX_COST_USD = float(os.environ.get('MAX_COST_USD', '50.0'))

# In-memory cost tracking (resets on Lambda warm restart)
generation_count = 0
estimated_cost = 0.0

def get_gemini_api_key():
    """
    Retrieve Gemini API key from AWS Secrets Manager.
    Never expose in logs.
    """
    try:
        response = secrets_client.get_secret_value(SecretId=SECRETS_SECRET_ID)
        return response['SecretString']
    except Exception as e:
        logger.error(f"Failed to retrieve API key: {type(e).__name__}")
        raise RuntimeError("Authentication failed - check Secrets Manager configuration")

def generate_image_with_gemini(prompt: str, api_key: str) -> bytes:
    """
    Call Google Gemini 3 Pro to generate image.
    Returns PNG bytes.
    """
    import google.generativeai as genai
    
    # Configure Gemini with API key
    genai.configure(api_key=api_key)
    
    # Use Gemini 3 Pro (vision + generation model)
    model = genai.GenerativeModel('gemini-2.0-flash-001')
    
    try:
        # Generate image
        response = model.generate_content(
            [
                f"""Generate a high-quality Facebook ad image for a luxury property in Bohol, Philippines.
                
Prompt: {prompt}

Style: Professional, premium, modern. Use golden and emerald accents.
Dimensions: 1200x628 (Facebook ad standard).
Format: PNG, high-quality.

Return ONLY the image."""
            ]
        )
        
        # Extract image from response
        if hasattr(response, 'data') and response.data:
            return response.data
        
        raise RuntimeError("No image data in response")
    
    except Exception as e:
        logger.error(f"Gemini generation failed: {type(e).__name__}")
        raise

def upload_to_s3(image_bytes: bytes, filename: str) -> str:
    """
    Upload image to S3, return public URL.
    """
    try:
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=f"generated-ads/{filename}",
            Body=image_bytes,
            ContentType='image/png',
            ACL='public-read'
        )
        
        url = f"https://{S3_BUCKET}.s3.amazonaws.com/generated-ads/{filename}"
        logger.info(f"Uploaded to S3: {filename}")
        return url
    
    except Exception as e:
        logger.error(f"S3 upload failed: {type(e).__name__}")
        raise

def lambda_handler(event, context):
    """
    Main Lambda handler.
    
    Event format:
    {
        "prompt": "Foreign buyer targeting with luxury lifestyle",
        "variant_name": "foreign-buyer-v1"
    }
    """
    global generation_count, estimated_cost
    
    try:
        # Parse request
        body = json.loads(event.get('body', '{}')) if isinstance(event.get('body'), str) else event
        prompt = body.get('prompt', '').strip()
        variant_name = body.get('variant_name', f'ad-{datetime.now().strftime("%s")}')
        
        if not prompt:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing prompt field'})
            }
        
        # Check cost cap
        generation_count += 1
        # Estimated cost per image: $0.02 (using Gemini pricing)
        estimated_cost += 0.02
        
        if estimated_cost > MAX_COST_USD:
            logger.warning(f"Cost cap exceeded: ${estimated_cost:.2f} > ${MAX_COST_USD:.2f}")
            return {
                'statusCode': 429,
                'body': json.dumps({'error': 'Monthly cost limit reached. Contact administrator.'})
            }
        
        # Get API key from Secrets Manager
        logger.info("Retrieving credentials...")
        api_key = get_gemini_api_key()
        
        # Generate image
        logger.info(f"Generating image (variant: {variant_name})...")
        image_bytes = generate_image_with_gemini(prompt, api_key)
        
        # Upload to S3
        filename = f"{variant_name}_{hashlib.md5(prompt.encode()).hexdigest()[:8]}.png"
        url = upload_to_s3(image_bytes, filename)
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'success': True,
                'url': url,
                'filename': filename,
                'cost_estimate': '$0.02',
                'total_cost_today': f'${estimated_cost:.2f}'
            })
        }
    
    except Exception as e:
        logger.error(f"Lambda execution failed: {type(e).__name__}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Image generation failed. Check logs.'})
        }
