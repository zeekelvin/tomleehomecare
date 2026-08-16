import crypto from 'node:crypto';
import { AdminUser, UserRole } from '@/types';

const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || 'tomlee-homecare-super-secret-admin-key-2026-georgia-private-pay';
export const ADMIN_COOKIE_NAME = 'tomlee_admin_session';

export interface StoredAdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password_hash: string;
  salt: string;
  created_at: string;
  last_login_at?: string;
}

/**
 * Hash password with PBKDF2 SHA-512
 */
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, actualSalt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: actualSalt };
}

/**
 * Verify password against stored hash and salt
 */
export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

/**
 * Create a signed session token
 */
export function createSessionToken(user: AdminUser): string {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days expiration
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify signed session token
 */
export function verifySessionToken(token: string): { valid: boolean; user?: AdminUser } {
  if (!token || !token.includes('.')) return { valid: false };

  const [payloadB64, signature] = token.split('.');
  if (!payloadB64 || !signature) return { valid: false };

  const expectedSignature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadB64)
    .digest('base64url');

  if (signature !== expectedSignature) return { valid: false };

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) {
      return { valid: false }; // Expired
    }
    return {
      valid: true,
      user: {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        created_at: '',
      },
    };
  } catch {
    return { valid: false };
  }
}
