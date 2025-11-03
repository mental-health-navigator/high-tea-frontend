import { auth } from '@/app/(auth)/auth';
import { generateUUID } from '@/lib/utils';
import { ChatSDKError } from '@/lib/errors';
import { sendChatMessage } from '@/lib/api/mental-health-client';

export const maxDuration = 60;

// Simplified request body - just need the message and optional session
interface SimpleChatRequest {
  message: string;
  sessionId?: string | null;
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new ChatSDKError('unauthorized:chat').toResponse();
    }

    const json = await request.json();
    console.log('Received request body:', json);

    const { message, sessionId } = json as SimpleChatRequest;

    if (!message || typeof message !== 'string') {
      console.error('Invalid message:', message);
      return new ChatSDKError('bad_request:api').toResponse();
    }

    console.log('Processing message:', message, 'with sessionId:', sessionId);

    // Call custom Mental Health API
    const chatResponse = await sendChatMessage(message, sessionId);

    console.log('Received chat response:', chatResponse);

    // Return a simple JSON response that the frontend can handle
    return Response.json({
      message: {
        id: generateUUID(),
        role: 'assistant',
        content: chatResponse.reply.trim(),
      },
      services: chatResponse.services,
      top1_similarity: chatResponse.top1_similarity,
      disambiguation_needed: chatResponse.disambiguation_needed,
      request_service_change: chatResponse.request_service_change,
      sessionId: chatResponse.session_id,
      conversationLength: chatResponse.conversation_length,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
    return new ChatSDKError('bad_request:api').toResponse();
  }
}
