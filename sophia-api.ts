// API route for ElevenLabs integration
// /app/api/sophia/tts/route.js

import { NextRequest, NextResponse } from 'next/server';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const SOPHIA_VOICE_ID = process.env.SOPHIA_VOICE_ID || 'your-trained-voice-id';

export async function POST(request: NextRequest) {
  try {
    const { text, emotion = 'neutral' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // ElevenLabs TTS API call
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${SOPHIA_VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY ?? ''
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.8,
          style: 0.3, // Subtle warmth for Yuna's character
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('TTS API error:', error);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}

// Yuna's conversation intelligence
export async function handleConversation(userMessage: string, propertyData: any) {
  
  const sophiaContext = `
You are Yuna, a sophisticated Filipino luxury property consultant specializing in high-end real estate in Bohol, Philippines. 

Your expertise includes:
- Legal ownership structures for foreign buyers (corporations, leaseholds)
- Luxury property investment opportunities in Bohol
- Local market insights and connectivity advantages
- Concierge-level service with warm professionalism

Current property: ${JSON.stringify(propertyData)}

Respond as Yuna with:
- Refined Filipino-English accent and vocabulary
- Warm but professional tone
- Deep knowledge of legal structures
- Focus on investment value and security
- Subtle confidence that comes from expertise

Keep responses conversational, informative, and naturally lead toward qualifying the buyer's serious intent.
`;

  try {
    // GPT-4 conversation (replace with your preferred AI provider)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: sophiaContext },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error('Conversation AI error:', error);
    return "I'd love to help you learn more about this property and the investment opportunities in Bohol. Could you tell me what specific aspects interest you most?";
  }
}