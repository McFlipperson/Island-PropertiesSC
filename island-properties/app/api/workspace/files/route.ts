import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execAsync('find /home/ssm-user/.openclaw/workspace -maxdepth 3 -type f \\( -name "*.md" -o -name "*.json" -o -name "*.js" -o -name "*.ts" \\) | sort');
    const files = stdout.trim().split('\n').filter(Boolean);
    return NextResponse.json({ files });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
