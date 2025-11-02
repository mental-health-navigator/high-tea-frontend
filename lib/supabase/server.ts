import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

function getSupabaseEnvVars() {
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
      console.warn('[Supabase Server] Using mock credentials for CI/test environment');
    } else {
      throw new Error(
        'Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.',
      );
    }
  }

  return { supabaseUrl, supabaseAnonKey };
}

/**
 * Creates a Supabase client for server-side use (API routes, middleware, server components)
 * This client can access cookies and validate authentication
 */
export async function createServerClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseEnvVars();
  const cookieStore = await cookies();

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        // Pass cookies to Supabase for session validation
        cookie: cookieStore.toString(),
      },
    },
  });
}

/**
 * Gets the current authenticated user from the server-side Supabase client
 * Returns null if not authenticated
 */
export async function getServerUser() {
  const supabase = await createServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Gets the current session from the server-side Supabase client
 * Returns null if no active session
 */
export async function getServerSession() {
  const supabase = await createServerClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  return session;
}
