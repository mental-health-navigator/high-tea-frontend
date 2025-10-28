// API client for HealHub Service Ingestion API

export const INGESTION_API_BASE_URL =
  'https://hh-service-ingestion-api-30236141423.australia-southeast1.run.app';

// Types for /ingest/text endpoint
export interface TextIngestRequest {
  text_input: string;
}

export interface IngestPayload {
  [key: string]: any; // Flexible structure for extracted service data
}

export interface TextIngestResponse {
  extracted_payload: IngestPayload;
  missing_fields: string[];
  extraction_warnings: string[];
}

export interface IngestResponse {
  status: 'created' | 'error';
  reference_id: string; // UUID (service_campus_key)
  message: string;
  warnings: string[];
  errors: string[];
}

/**
 * Extract structured service data from free-text description.
 * Note: This does NOT save to the database - it only extracts and returns data.
 *
 * @param textInput - Free-text service description
 * @returns Extracted payload with warnings and missing fields
 */
export async function ingestText(
  textInput: string,
): Promise<TextIngestResponse> {
  const url = new URL('/ingest/text', INGESTION_API_BASE_URL);
  url.searchParams.append('text_input', textInput);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ detail: 'Unknown error' }));
    throw new Error(errorData.detail || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Ingest service data as JSON with AI-powered validation and correction.
 * This WILL save the data to the database.
 *
 * @param payload - Service data as JSON object
 * @returns Ingest response with status and reference ID
 */
export async function ingestJson(
  payload: IngestPayload,
): Promise<IngestResponse> {
  const url = new URL('/ingest/json', INGESTION_API_BASE_URL);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ detail: 'Unknown error' }));
    throw new Error(errorData.detail || `API error: ${response.status}`);
  }

  return response.json();
}
