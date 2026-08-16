import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const { valid, user } = verifySessionToken(token);
  if (!valid || !user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
