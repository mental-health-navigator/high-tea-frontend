import { z } from 'zod';
import type { getWeather } from './ai/tools/get-weather';
import type { createDocument } from './ai/tools/create-document';
import type { updateDocument } from './ai/tools/update-document';
import type { requestSuggestions } from './ai/tools/request-suggestions';
import type { InferUITool, UIMessage } from 'ai';

import type { ArtifactKind } from '@/components/artifact';
import type { Suggestion } from './db/schema';

export type DataPart = { type: 'append-message'; message: string };

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

type weatherTool = InferUITool<typeof getWeather>;
type createDocumentTool = InferUITool<ReturnType<typeof createDocument>>;
type updateDocumentTool = InferUITool<ReturnType<typeof updateDocument>>;
type requestSuggestionsTool = InferUITool<
  ReturnType<typeof requestSuggestions>
>;

export type ChatTools = {
  getWeather: weatherTool;
  createDocument: createDocumentTool;
  updateDocument: updateDocumentTool;
  requestSuggestions: requestSuggestionsTool;
};

export interface ServiceData {
  service_campus_key: string;
  organisation?: string | null;
  name?: string | null;
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

export type CustomUIDataTypes = {
  textDelta: string;
  imageDelta: string;
  sheetDelta: string;
  codeDelta: string;
  suggestion: Suggestion;
  appendMessage: string;
  id: string;
  title: string;
  kind: ArtifactKind;
  clear: null;
  finish: null;
  services: ServiceData[];
  top1_similarity: number;
  disambiguation_needed: boolean;
  request_service_change: boolean;
  sessionId: string;
  conversationLength: number;
};

export type ChatMessage = UIMessage<
  MessageMetadata,
  CustomUIDataTypes,
  ChatTools
> & {
  experimental_data?: {
    services?: ServiceData[];
    top1_similarity?: number;
    disambiguation_needed?: boolean;
    request_service_change?: boolean;
  };
};

export interface Attachment {
  name: string;
  url: string;
  contentType: string;
}
