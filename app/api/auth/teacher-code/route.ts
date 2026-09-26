import { NextResponse } from 'next/server';

const DEFAULT_TEACHER_CODE = 'SYNYPKZ-TEACHER';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { code?: unknown };
    const code = typeof body.code === 'string' ? body.code.trim() : '';

    if (!code) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const expectedCode = process.env.TEACHER_REGISTRATION_CODE || DEFAULT_TEACHER_CODE;
    if (code !== expectedCode) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
