'use client';

import { useState, useCallback, useEffect } from 'react';
import { sendOtpToEmail, verifyOtpCode } from '@/lib/supabase/otp-actions';
import { supabase } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';

export type OTPFlowState =
  | 'idle'
  | 'sending'
  | 'otp_sent'
  | 'verifying'
  | 'verified'
  | 'error';

export interface UseOtpVerificationReturn {
  /** Current state of the OTP flow */
  state: OTPFlowState;
  /** Email address being verified */
  email: string;
  /** Error message if any */
  error: string | null;
  /** Success message if any */
  message: string | null;
  /** Whether the flow is currently processing */
  isLoading: boolean;
  /** Supabase session after successful verification */
  session: Session | null;
  /** Send OTP to email */
  sendOtp: (email: string) => Promise<void>;
  /** Verify OTP code */
  verifyOtp: (code: string) => Promise<void>;
  /** Reset the entire flow */
  resetFlow: () => void;
  /** Go back to email input step */
  goBack: () => void;
}

/**
 * Hook for managing OTP verification flow state
 * Can be used anywhere in the app for inline verification
 */
export function useOtpVerification(): UseOtpVerificationReturn {
  const [state, setState] = useState<OTPFlowState>('idle');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const isLoading = state === 'sending' || state === 'verifying';

  // Listen for auth state changes and update session
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendOtp = useCallback(async (emailAddress: string) => {
    setState('sending');
    setError(null);
    setMessage(null);
    setEmail(emailAddress);

    const result = await sendOtpToEmail(emailAddress);

    if (result.status === 'success') {
      setState('otp_sent');
      setMessage(result.message || null);
    } else {
      setState('error');
      setError(result.message || 'Failed to send verification code');
    }
  }, []);

  const verifyOtp = useCallback(
    async (code: string) => {
      if (!email) {
        setError('Email address is required');
        return;
      }

      setState('verifying');
      setError(null);
      setMessage(null);

      // Verify OTP directly with client-side Supabase to ensure session is stored in browser
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email',
      });

      if (verifyError) {
        console.error('Supabase OTP verification error:', verifyError);
        setState('error');
        setError(verifyError.message || 'Invalid or expired verification code');
      } else {
        setState('verified');
        setMessage('Email verified successfully!');
        // Session is automatically stored by Supabase client
        setSession(data.session);
      }
    },
    [email],
  );

  const resetFlow = useCallback(() => {
    setState('idle');
    setEmail('');
    setError(null);
    setMessage(null);
  }, []);

  const goBack = useCallback(() => {
    setState('idle');
    setError(null);
    setMessage(null);
  }, []);

  return {
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
  };
}
