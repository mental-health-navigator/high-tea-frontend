/**
 * Mental Health Service Navigator API Client
 * Based on the backend OpenAPI specification
 */

export interface SearchHit {
  service_campus_key: string;
  organisation_name?: string | null;
  service_name?: string | null;
  campus_name?: string | null;
  address?: string | null;
  suburb?: string | null;
  state?: string | null;
  postcode?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  costs?: string | null;
  referral_pathways?: string | null;
  target_populations?: string | null;
  delivery_methods?: string | null;
  levels_of_care?: string | null;
  expected_wait_time?: string | null;
  op_hours_24_7?: boolean | null;
  op_hours_standard?: boolean | null;
  op_hours_extended?: boolean | null;
  op_hours_extended_details?: string | null;
  notes?: string | null;
  eligibility_and_description?: string | null;
  cosine_similarity?: number | null;
}

export interface ChatRequest {
  message: string;
  session_id?: string | null;
}

export interface ChatResponse {
  session_id: string;
  reply: string;
  services: SearchHit[];
  top1_similarity: number;
  disambiguation_needed: boolean;
  conversation_length: number;
  request_service_change: boolean;
}

export interface SemanticSearchRequest {
  query: string;
  similarity_threshold?: number | null;
  max_results?: number | null;
}

export interface SemanticSearchResponse {
  items: SearchHit[];
  top1_similarity: number;
  disambiguation_needed: boolean;
}

/**
 * Send a chat message to the Mental Health Service Navigator API
 */
export async function sendChatMessage(
  message: string,
  sessionId?: string | null,
): Promise<ChatResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_HIGHTEA_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      'NEXT_PUBLIC_HIGHTEA_API_BASE_URL environment variable is not set',
    );
  }

  const requestBody: ChatRequest = {
    message,
    session_id: sessionId || null,
  };

  const response = await fetch(`${apiBaseUrl}/chat/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Mental Health API error (${response.status}): ${errorText}`,
    );
  }

  return response.json();
}

/**
 * Perform semantic search for mental health services
 */
export async function searchServices(
  query: string,
  options?: {
    similarityThreshold?: number;
    maxResults?: number;
  },
): Promise<SemanticSearchResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_HIGHTEA_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error(
      'NEXT_PUBLIC_HIGHTEA_API_BASE_URL environment variable is not set',
    );
  }

  const requestBody: SemanticSearchRequest = {
    query,
    similarity_threshold: options?.similarityThreshold ?? 0.0,
    max_results: options?.maxResults ?? 5,
  };

  const response = await fetch(`${apiBaseUrl}/search/semantic`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Mental Health API error (${response.status}): ${errorText}`,
    );
  }

  return response.json();
}

/**
 * Check if the Mental Health API is ready
 */
export async function checkApiHealth(): Promise<boolean> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_HIGHTEA_API_BASE_URL;

  if (!apiBaseUrl) {
    return false;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/search/_ready`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}
