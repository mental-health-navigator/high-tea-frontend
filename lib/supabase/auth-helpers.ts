import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Gets the authenticated user's information from request headers
 * This assumes the middleware has already validated the auth and set these headers
 */
export async function getAuthUser() {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  const userEmail = headersList.get('x-user-email');

  if (!userId || !userEmail) {
    return null;
  }

  return {
    id: userId,
    email: userEmail,
  };
}

/**
 * Returns a 401 Unauthorized response with a message
 */
export function unauthorizedResponse(message = 'Unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 });
}

/**
 * Validates that a user is authenticated
 * Returns the user if authenticated, or a 401 response if not
 */
export async function requireAuth() {
  const user = await getAuthUser();

  if (!user) {
    return { authenticated: false as const, response: unauthorizedResponse() };
  }

  return { authenticated: true as const, user };
}
