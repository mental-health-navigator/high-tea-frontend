import { createClient } from '@supabase/supabase-js';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// In CI or test environments, use mock credentials if real ones aren't provided
if (!supabaseUrl || !supabaseAnonKey) {
  const isCI = process.env.CI === 'true';
  const isPlaywright = process.env.PLAYWRIGHT === 'True';

  if (isCI || isPlaywright) {
    // Provide mock Supabase credentials for testing
    supabaseUrl = 'https://mock-supabase-url.supabase.co';
    supabaseAnonKey = 'mock-anon-key-for-testing';
    console.warn('[Supabase Client] Using mock credentials for CI/test environment');
  } else {
    throw new Error(
      'Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.',
    );
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
