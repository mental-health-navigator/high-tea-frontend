'use client';

import { useEffect, useState } from 'react';
import { ChatHeader } from '@/components/chat-header';
import { Artifact } from './artifact';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import type { VisibilityType } from './visibility-selector';
import { useArtifactSelector } from '@/hooks/use-artifact';
import { toast } from './toast';
import type { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { useChatVisibility } from '@/hooks/use-chat-visibility';
import { useAutoResume } from '@/hooks/use-auto-resume';
import { ChatSDKError } from '@/lib/errors';
import type { Attachment, ChatMessage } from '@/lib/types';
import { useDataStream } from './data-stream-provider';
import Image from 'next/image';
import { ServiceFormContainer } from './service-form-container';
import { OtpFlow } from './otp-flow';
import { useSimpleChat } from '@/hooks/use-simple-chat';

export function Chat({
  id,
  initialMessages,
  initialChatModel,
  initialVisibilityType,
  isReadonly,
  session,
  autoResume,
}: {
  id: string;
  initialMessages: ChatMessage[];
  initialChatModel: string;
  initialVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
  autoResume: boolean;
}) {
  const { visibilityType } = useChatVisibility({
    chatId: id,
    initialVisibilityType,
  });

  const { setDataStream } = useDataStream();

  const [input, setInput] = useState<string>('');
  const [flowState, setFlowState] = useState<'chat' | 'otp' | 'form'>('chat');
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);

  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    regenerate,
    resumeStream,
  } = useSimpleChat({
    id,
    messages: initialMessages,
    onData: (dataPart) => {
      console.log('Received data part:', dataPart);
      setDataStream((ds) => (ds ? [...ds, dataPart] : []));

      // When request_service_change is detected, transition to OTP flow
      if (
        dataPart.type === 'data-request_service_change' &&
        dataPart.data === true
      ) {
        setFlowState('otp');
      }
    },
    onFinish: (result) => {
      console.log('Chat finished with result:', result);
      console.log('Current messages:', messages);
    },
    onError: (error) => {
      console.error('Chat error:', error);
      if (error instanceof ChatSDKError) {
        toast({
          type: 'error',
          description: error.message,
        });
      }
    },
  });

  // Handle OTP verification completion
  const handleOtpVerified = (email: string) => {
    setVerifiedEmail(email);
    setFlowState('form');
  };

  // Handle form submission completion
  const handleFormSuccess = () => {
    // Reset back to chat state
    setFlowState('chat');
    setVerifiedEmail(null);
    toast({
      type: 'success',
      description: 'Service submitted successfully! You can continue chatting.',
    });
  };

  // Handle form cancellation
  const handleFormCancel = () => {
    setFlowState('chat');
    setVerifiedEmail(null);
  };

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [hasAppendedQuery, setHasAppendedQuery] = useState(false);

  useEffect(() => {
    if (query && !hasAppendedQuery) {
      sendMessage({
        role: 'user' as const,
        parts: [{ type: 'text', text: query }],
      });

      setHasAppendedQuery(true);
      window.history.replaceState({}, '', `/`);
    }
  }, [query, sendMessage, hasAppendedQuery, id]);

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);

  useAutoResume({
    autoResume,
    initialMessages,
    resumeStream,
    setMessages,
  });

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        {/* Top right brush, always visible and responsive */}
        <div
          className="pointer-events-none fixed z-0"
          style={{
            top: -80,
            right: -150,
            width: '700px',
            height: '700px',
            maxWidth: '100vw',
            zIndex: 0,
          }}
        >
          <Image
            src="/images/brush-new.png"
            alt="Brush Top Right"
            width={1000}
            height={1000}
            className="animate-floatY"
            priority
          />
        </div>
        {/* Bottom left brush, center aligned to bottom left, moved up */}
        <div
          className="pointer-events-none fixed z-0"
          style={{
            left: 100,
            bottom: 250,
            width: '700px',
            height: '700px',
            transform: 'translate(-50%,50%) rotate(180deg)',
          }}
        >
          <Image
            src="/images/brush-new.png"
            alt="Brush Bottom Left"
            width={1000}
            height={1000}
            className="animate-floatY"
            priority
          />
        </div>
        <ChatHeader
          chatId={id}
          selectedModelId={initialChatModel}
          selectedVisibilityType={initialVisibilityType}
          isReadonly={isReadonly}
          session={session}
        />

        {/* Scrollable content area that contains messages and form/otp */}
        <div className="flex flex-col min-w-0 flex-1 overflow-y-auto">
          <Messages
            chatId={id}
            status={status}
            messages={messages}
            setMessages={setMessages}
            regenerate={regenerate}
            isReadonly={isReadonly}
            isArtifactVisible={isArtifactVisible}
          />

          {/* OTP Flow - shown when request_service_change is detected */}
          {flowState === 'otp' && (
            <div className="mx-auto w-full md:max-w-3xl pb-4">
              <OtpFlow
                onVerified={handleOtpVerified}
                onError={(error) => {
                  toast({
                    type: 'error',
                    description: error,
                  });
                }}
              />
            </div>
          )}

          {/* Service Form - shown after OTP verification */}
          {flowState === 'form' && (
            <div className="mx-auto px-4 w-full md:max-w-3xl pb-4 md:pb-6">
              <ServiceFormContainer
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
          )}
        </div>

        {/* Chat Input - fixed at bottom, shown only in chat state */}
        {flowState === 'chat' && (
          <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
            {!isReadonly && (
              <MultimodalInput
                chatId={id}
                input={input}
                setInput={setInput}
                status={status}
                stop={stop}
                attachments={attachments}
                setAttachments={setAttachments}
                messages={messages}
                setMessages={setMessages}
                sendMessage={sendMessage}
                selectedVisibilityType={visibilityType}
              />
            )}
          </form>
        )}
      </div>

      <Artifact
        chatId={id}
        input={input}
        setInput={setInput}
        status={status}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        sendMessage={sendMessage}
        messages={messages}
        setMessages={setMessages}
        regenerate={regenerate}
        isReadonly={isReadonly}
        selectedVisibilityType={visibilityType}
      />
    </>
  );
}
