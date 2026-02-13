# Lambda Nano-Banana Setup Guide

## Overview
This Lambda function generates Facebook ad images using Google Gemini 3 Pro, triggered on-demand by SC.
- Runs on 30-second timeout (fail-safe against runaway costs)
- Cost cap: $50/month (auto-stop at limit)
- All credentials via AWS Secrets Manager (safe, no hardcoding)

## Step 1: Create Lambda Execution Role

```bash
# Create role
aws iam create-role \
  --role-name nano-banana-lambda-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "lambda.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

# Attach S3 policy (generate-ads/ folder only)
aws iam put-role-policy \
  --role-name nano-banana-lambda-role \
  --policy-name S3AccessPolicy \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:PutObjectAcl"],
      "Resource": "arn:aws:s3:::island-properties-images/generated-ads/*"
    }]
  }'

# Attach Secrets Manager policy
aws iam put-role-policy \
  --role-name nano-banana-lambda-role \
  --policy-name SecretsManagerPolicy \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": "secretsmanager:GetSecretValue",
      "Resource": "arn:aws:secretsmanager:us-east-1:422491854978:secret:gemini-api-key-*"
    }]
  }'

# Attach CloudWatch Logs policy (for error tracking)
aws iam attach-role-policy \
  --role-name nano-banana-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

## Step 2: Store Gemini API Key in Secrets Manager

```bash
# Create secret (replace YOUR_GEMINI_API_KEY)
aws secretsmanager create-secret \
  --name gemini-api-key \
  --secret-string 'YOUR_GEMINI_API_KEY' \
  --description 'Google Gemini API key for nano-banana image generation'
```

## Step 3: Package Lambda Function

```bash
cd /home/ssm-user/.openclaw/workspace/lambda-nano-banana

# Create deployment package
mkdir -p build
pip install -r requirements.txt -t build/

# Copy function code
cp lambda_function.py build/

# Create ZIP
cd build && zip -r ../nano-banana-lambda.zip . && cd ..
```

## Step 4: Create Lambda Function

```bash
# Create function
aws lambda create-function \
  --function-name nano-banana-image-gen \
  --runtime python3.12 \
  --role arn:aws:iam::422491854978:role/nano-banana-lambda-role \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://nano-banana-lambda.zip \
  --timeout 30 \
  --memory-size 512 \
  --environment Variables="{S3_BUCKET=island-properties-images,SECRETS_SECRET_ID=gemini-api-key,MAX_COST_USD=50.0}"
```

## Step 5: Set Up CloudWatch Alarms

```bash
# Create SNS topic for alerts
aws sns create-topic --name nano-banana-alerts

# Create alarm if costs spike
aws cloudwatch put-metric-alarm \
  --alarm-name nano-banana-cost-spike \
  --alarm-description 'Alert if Lambda invocations spike' \
  --metric-name Invocations \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 3600 \
  --threshold 100 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1
```

## Step 6: Test Lambda Function

```bash
# Create test payload
aws lambda invoke \
  --function-name nano-banana-image-gen \
  --payload '{
    "prompt": "Luxury waterfront estate in Bohol with 7.2% annual yield for foreign investors",
    "variant_name": "test-foreign-buyer"
  }' \
  /tmp/lambda-response.json

cat /tmp/lambda-response.json
```

## Step 7: SC Can Now Call Lambda from Python

```python
import boto3
import json

lambda_client = boto3.client('lambda')

def generate_ad_image(prompt: str, variant_name: str) -> dict:
    """Generate FB ad image via Lambda."""
    response = lambda_client.invoke(
        FunctionName='nano-banana-image-gen',
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'prompt': prompt,
            'variant_name': variant_name
        })
    )
    
    return json.loads(response['Payload'].read())
```

## Cost Monitoring

Lambda invocations cost ~$0.02 per image.
- 50 images/month = $1.00
- 500 images/month = $10.00
- 2,500 images/month = $50.00 (hard cap, auto-shutdown)

Track spending:
```bash
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Invocations \
  --start-time 2026-02-01T00:00:00Z \
  --end-time 2026-02-11T23:59:59Z \
  --period 86400 \
  --statistics Sum
```

## Cleanup (if needed)

```bash
# Delete function
aws lambda delete-function --function-name nano-banana-image-gen

# Delete role
aws iam delete-role --role-name nano-banana-lambda-role

# Delete secret
aws secretsmanager delete-secret --secret-id gemini-api-key
```

---

**Status:** READY FOR DEPLOYMENT
**Created:** 2026-02-11 01:30 UTC
