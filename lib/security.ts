/**
 * TomLee Homecare Security & Sanitization Utilities
 * Implements input sanitization, rate-limiting, and validation
 */

// Simple in-memory sliding-window rate limiter
const ipRequestHistory = new Map<string, number[]>();

export function checkRateLimit(ip: string, maxRequests = 10, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = ipRequestHistory.get(ip) || [];
  
  // Filter out timestamps outside the current window
  const validTimestamps = timestamps.filter(t => now - t < windowMs);
  
  if (validTimestamps.length >= maxRequests) {
    ipRequestHistory.set(ip, validTimestamps);
    return { allowed: false, remaining: 0 };
  }
  
  validTimestamps.push(now);
  ipRequestHistory.set(ip, validTimestamps);
  return { allowed: true, remaining: maxRequests - validTimestamps.length };
}

/**
 * Strips potentially dangerous HTML tags and script injections
 */
export function sanitizeInput(input: unknown, maxLength = 500): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/[<>'"`;()&$]/g, (char) => {
      // Escape critical chars
      const map: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
        '`': '&#96;',
        ';': '&#59;',
        '(': '&#40;',
        ')': '&#41;',
        '&': '&amp;',
        '$': '&#36;',
      };
      return map[char] || char;
    })
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates standard US email address formats
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

/**
 * Validates and formats US phone numbers
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  // Strip non-digits
  const digits = phone.replace(/\D/g, '');
  // Must be 10 digits or 11 with country code '1'
  return (digits.length === 10) || (digits.length === 11 && digits.startsWith('1'));
}

/**
 * Standardizes phone number to format: (XXX) XXX-XXXX
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  const cleanDigits = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (cleanDigits.length === 10) {
    return `(${cleanDigits.slice(0, 3)}) ${cleanDigits.slice(3, 6)}-${cleanDigits.slice(6)}`;
  }
  return phone;
}

/**
 * Validates Georgia 5-digit ZIP codes
 */
export function isValidGeorgiaZip(zip: string): boolean {
  const cleanZip = zip.replace(/\D/g, '').slice(0, 5);
  if (cleanZip.length !== 5) return false;
  // Georgia zip codes generally fall in 30000 - 39999 (specifically 30000-31999 and 398xx-399xx)
  const num = parseInt(cleanZip, 10);
  return num >= 30000 && num <= 39999;
}
