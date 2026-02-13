"""
SC's nano-banana wrapper — call this to generate ad images.
Handles Lambda invocation + error handling.
"""

import boto3
import json
from typing import Optional

class NanoBananaGenerator:
    """Autonomous image generation via Lambda."""
    
    def __init__(self, function_name: str = 'nano-banana-image-gen'):
        self.lambda_client = boto3.client('lambda')
        self.function_name = function_name
    
    def generate_ad(self, 
                   prompt: str, 
                   variant_name: str) -> dict:
        """
        Generate an ad image.
        
        Args:
            prompt: Image generation prompt (what to create)
            variant_name: Ad variant identifier (e.g., "foreign-buyer-v1")
        
        Returns:
            {
                'success': bool,
                'url': 'https://...' (if success),
                'error': str (if failed),
                'cost_estimate': '$0.02'
            }
        """
        try:
            response = self.lambda_client.invoke(
                FunctionName=self.function_name,
                InvocationType='RequestResponse',
                Payload=json.dumps({
                    'prompt': prompt,
                    'variant_name': variant_name
                })
            )
            
            # Parse response
            payload = json.loads(response['Payload'].read())
            body = json.loads(payload.get('body', '{}'))
            
            if response.get('StatusCode') == 200:
                return {
                    'success': True,
                    'url': body.get('url'),
                    'filename': body.get('filename'),
                    'cost': body.get('cost_estimate')
                }
            else:
                return {
                    'success': False,
                    'error': body.get('error', 'Unknown error'),
                    'status_code': response.get('StatusCode')
                }
        
        except Exception as e:
            return {
                'success': False,
                'error': f'Lambda invocation failed: {str(e)}'
            }


# Usage example:
if __name__ == '__main__':
    gen = NanoBananaGenerator()
    
    # Generate foreign buyer variant
    result = gen.generate_ad(
        prompt="Luxury waterfront estate in Bohol with 7.2% annual yield for foreign investors. Golden sunset backdrop.",
        variant_name="foreign-buyer-v1"
    )
    
    if result['success']:
        print(f"✓ Generated: {result['url']}")
        print(f"  Cost: {result['cost']}")
    else:
        print(f"✗ Failed: {result['error']}")
