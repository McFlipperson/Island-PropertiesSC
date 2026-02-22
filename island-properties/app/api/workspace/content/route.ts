import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    
    if (!path || !path.startsWith('/home/ssm-user/.openclaw/workspace')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    
    const content = await readFile(path, 'utf-8');
    return NextResponse.json({ content, path });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
