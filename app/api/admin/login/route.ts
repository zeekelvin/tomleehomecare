import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { verifyPassword, createSessionToken, ADMIN_COOKIE_NAME, StoredAdminUser } from '@/lib/auth';
import { checkRateLimit, sanitizeInput } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'admin-client';
    const rateCheck = checkRateLimit(clientIp, 8, 60000); // 8 login attempts per minute max
    
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many login attempts. Please wait 1 minute before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const email = sanitizeInput(String(body.email || '').toLowerCase().trim(), 100);
    const password = String(body.password || '');

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const storedUser = user as StoredAdminUser;
    const isValid = verifyPassword(password, storedUser.password_hash, storedUser.salt);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Update last login timestamp
    supabase
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', storedUser.id)
      .then();

    const sessionUser = {
      id: storedUser.id,
      email: storedUser.email,
      name: storedUser.name,
      role: storedUser.role,
      created_at: storedUser.created_at,
    };

    const token = createSessionToken(sessionUser);

    const response = NextResponse.json({
      success: true,
      user: sessionUser,
      message: 'Login successful',
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
