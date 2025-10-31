'use client';

import { useEffect, useRef } from 'react';
import { EmailInputOtp } from '../email-input/email-input-otp';
import { VerificationCodeInput } from '../verification-form-input/verification-form-input';
import { useOtpVerification } from '@/hooks/use-otp-verification';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';

export interface OtpFlowProps {
  /** Callback when verification is complete - receives email and session */
  onVerified?: (email: string, session: Session | null) => void;
  /** Callback when flow encounters an error */
  onError?: (error: string) => void;
  /** Email label text */
  emailLabel?: string;
  /** Verification code label text */
  codeLabel?: string;
  /** Additional className for container */
  className?: string;
  /** Auto-focus inputs */
  autoFocus?: boolean;
}

/**
 * Composable OTP verification flow component
 * Combines email input and verification code input with state management
 * Can be embedded inline anywhere (chat, modals, forms)
 */
export function OtpFlow({
  onVerified,
  onError,
  emailLabel = 'What is your email address?',
  codeLabel = 'Enter verification code',
  className = '',
  autoFocus = true,
}: OtpFlowProps) {
  const {
    state,
    email,
    error,
    message,
    isLoading,
    session,
    sendOtp,
    verifyOtp,
    resetFlow,
    goBack,
  } = useOtpVerification();

  // Track the last submitted code to prevent duplicate submissions
  const lastSubmittedCodeRef = useRef<string | null>(null);

  // Handle verification success
  useEffect(() => {
    if (state === 'verified' && onVerified) {
      onVerified(email, session);
    }
  }, [state, email, session, onVerified]);

  // Handle errors
  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const handleEmailSubmit = async (emailAddress: string) => {
    lastSubmittedCodeRef.current = null; // Reset on new email submission
    await sendOtp(emailAddress);
  };

  const handleCodeComplete = async (code: string) => {
    // Prevent duplicate submissions of the same code
    if (lastSubmittedCodeRef.current === code || isLoading || state === 'verified') {
      return;
    }

    lastSubmittedCodeRef.current = code;
    await verifyOtp(code);
  };

  // Track which step we're on with a ref to survive state changes
  const currentStepRef = useRef<'email' | 'code'>('email');

  // Update step when OTP is successfully sent
  useEffect(() => {
    if (state === 'otp_sent') {
      currentStepRef.current = 'code';
    } else if (state === 'idle') {
      currentStepRef.current = 'email';
    }
  }, [state]);

  // Determine which step to show based on state
  const isOnEmailStep = currentStepRef.current === 'email';
  const isOnCodeStep = currentStepRef.current === 'code';

  const showEmailInput =
    state === 'idle' ||
    state === 'sending' ||
    (state === 'error' && isOnEmailStep);

  const showCodeInput =
    state === 'otp_sent' ||
    state === 'verifying' ||
    state === 'verified' ||
    (state === 'error' && isOnCodeStep);

  const isEmailStepError = state === 'error' && isOnEmailStep;
  const isCodeStepError = state === 'error' && isOnCodeStep;

  return (
    <div className={`flex flex-col gap-4 w-full ${className}`}>
      {/* Email Input Step */}
      {showEmailInput && (
        <EmailInputOtp
          onSubmit={handleEmailSubmit}
          label={emailLabel}
          isLoading={state === 'sending'}
          isSuccessful={false}
          isError={isEmailStepError}
          errorMessage={error || undefined}
          autoFocus={autoFocus}
        />
      )}

      {/* Verification Code Input Step */}
      {showCodeInput && (
        <div className="flex flex-col gap-4 mx-auto md:max-w-3xl w-full pb-4 md:pb-6 px-4">
          {/* Back button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={goBack}
            disabled={isLoading || state === 'verified'}
            className="self-start -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="verification-code"
              className="text-zinc-600 font-normal dark:text-zinc-400"
            >
              {codeLabel}
            </label>
            <p className="text-sm text-muted-foreground mb-2">
              We sent a 6-digit code to <strong>{email}</strong>
            </p>

            <VerificationCodeInput
              length={6}
              onComplete={handleCodeComplete}
              error={isCodeStepError}
              disabled={isLoading || state === 'verified'}
              autoFocus={autoFocus}
            />

            {isCodeStepError && error && (
              <p className="text-sm text-destructive mt-2">{error}</p>
            )}

            {state === 'verified' && message && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                {message}
              </p>
            )}

            {/* Resend option */}
            {(state === 'otp_sent' || isCodeStepError) && (
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => sendOtp(email)}
                disabled={isLoading}
                className="self-start -ml-4 mt-2"
              >
                Resend code
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
