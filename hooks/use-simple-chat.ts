import { useState, useCallback } from 'react';
import type { ChatMessage } from '@/lib/types';
import type { ServiceData } from '@/lib/types';
import { generateUUID } from '@/lib/utils';

interface UseChatOptions {
  id?: string;
  messages?: ChatMessage[];
  onError?: (error: Error) => void;
  onFinish?: (result: any) => void;
  onData?: (data: any) => void;
}

interface ChatResponse {
  message: {
    id: string;
    role: 'assistant';
    content: string;
  };
  services: ServiceData[];
  top1_similarity: number;
  disambiguation_needed: boolean;
  request_service_change: boolean;
  sessionId: string;
  conversationLength: number;
}

type Status = 'ready' | 'submitted' | 'streaming';

export function useSimpleChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    options.messages || [],
  );
  const [status, setStatus] = useState<Status>('ready');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [top1Similarity, setTop1Similarity] = useState<number>();
  const [disambiguationNeeded, setDisambiguationNeeded] = useState(false);
  const [requestServiceChange, setRequestServiceChange] = useState(false);

  const sendMessage = useCallback(
    async (message: any) => {
      if (status !== 'ready') return;

      // Extract text from message parts
      const textParts = message.parts
        .filter((part: any) => part.type === 'text')
        .map((part: any) => part.text)
        .join(' ');

      if (!textParts.trim()) return;

      // Add user message immediately
      const userMessage: ChatMessage = {
        id: generateUUID(),
        role: 'user',
        parts: message.parts,
      };

      setMessages((prev) => [...prev, userMessage]);
      setStatus('submitted');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textParts,
            sessionId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const data: ChatResponse = await response.json();

        console.log('Received response data:', data);

        // Add assistant message with services attached as metadata
        const assistantMessage: ChatMessage = {
          id: data.message.id,
          role: 'assistant',
          parts: [{ type: 'text', text: data.message.content }],
          experimental_data: {
            services: data.services,
            top1_similarity: data.top1_similarity,
            disambiguation_needed: data.disambiguation_needed,
            request_service_change: data.request_service_change,
          },
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Update session and service data
        setSessionId(data.sessionId);
        setServices(data.services);
        setTop1Similarity(data.top1_similarity);
        setDisambiguationNeeded(data.disambiguation_needed);
        setRequestServiceChange(data.request_service_change);

        // Call onData callback for each piece of data
        if (options.onData) {
          options.onData({ type: 'data-services', data: data.services });
          options.onData({ type: 'data-top1_similarity', data: data.top1_similarity });
          options.onData({ type: 'data-disambiguation_needed', data: data.disambiguation_needed });
          options.onData({ type: 'data-request_service_change', data: data.request_service_change });
          options.onData({ type: 'data-sessionId', data: data.sessionId });
        }

        // Call onFinish callback
        if (options.onFinish) {
          options.onFinish({ message: assistantMessage });
        }

        console.log('Updated messages:', [...messages, userMessage, assistantMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        if (options.onError) {
          options.onError(error as Error);
        }
      } finally {
        setStatus('ready');
      }
    },
    [status, sessionId, options, messages],
  );

  // Stub functions for compatibility with AI SDK interface
  const stop = useCallback(async () => {
    // No-op for now since we don't support streaming cancellation
    setStatus('ready');
  }, []);

  const regenerate = useCallback(async () => {
    // No-op for now
    console.warn('regenerate is not implemented');
  }, []);

  const resumeStream = useCallback(async () => {
    // No-op for now
    console.warn('resumeStream is not implemented');
  }, []);

  return {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    regenerate,
    resumeStream,
    services,
    top1Similarity,
    disambiguationNeeded,
    requestServiceChange,
  };
}
