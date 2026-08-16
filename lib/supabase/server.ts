import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mzgkdkhclebxothqzjtd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16Z2tka2hjbGVieG90aHF6anRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3NTU4NTMsImV4cCI6MjEwMjMzMTg1M30.McI5GODYLhLcks1j7rAkUStIFBh5nsAmM9M6H-0gSNU';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createServerClient() {
  return createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
