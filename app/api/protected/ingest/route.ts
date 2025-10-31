import { type NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/supabase/auth-helpers';
import { INGESTION_API_BASE_URL } from '@/lib/api/ingestion';

/**
 * Protected API route that proxies requests to the external ingestion API
 * This route is protected by middleware - only authenticated users can access it
 */
export async function POST(request: NextRequest) {
  // Get authenticated user from headers (set by middleware)
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized - Authentication required' },
      { status: 401 },
    );
  }

  try {
    // Parse the incoming JSON payload
    const payload = await request.json();

    // Forward the request to the external ingestion API
    const url = new URL('/ingest/json', INGESTION_API_BASE_URL);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optionally include user context for the external API
        'X-User-Email': user.email,
      },
      body: JSON.stringify(payload),
    });

    // Get response data
    const data = await response.json();

    // Forward the status code and data from the external API
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying to ingestion API:', error);

    // Handle parsing errors or network errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        detail: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
