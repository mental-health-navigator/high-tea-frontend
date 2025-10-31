'use server';

import { supabase } from './client';
import type { Session } from '@supabase/supabase-js';

export interface OTPActionState {
  status: 'idle' | 'success' | 'failed' | 'invalid_data';
  message?: string;
  session?: Session;
}

/**
 * Sends an OTP to the provided email address using Supabase Auth
 */
export async function sendOtpToEmail(
  email: string,
): Promise<OTPActionState> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        status: 'invalid_data',
        message: 'Please enter a valid email address',
      };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true, // Create user account if it doesn't exist
      },
    });

    if (error) {
      console.error('Supabase OTP error:', error);
      return {
        status: 'failed',
        message: error.message || 'Failed to send verification code',
      };
    }

    return {
      status: 'success',
      message: 'Verification code sent! Check your email.',
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      status: 'failed',
      message: 'An unexpected error occurred',
    };
  }
}

/**
 * Verifies an OTP token for the provided email address
 */
export async function verifyOtpCode(
  email: string,
  token: string,
): Promise<OTPActionState> {
  try {
    // Validate inputs
    if (!email || !token) {
      return {
        status: 'invalid_data',
        message: 'Email and verification code are required',
      };
    }

    if (token.length !== 6 || !/^\d{6}$/.test(token)) {
      return {
        status: 'invalid_data',
        message: 'Verification code must be 6 digits',
      };
    }

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) {
      console.error('Supabase OTP verification error:', error);
      return {
        status: 'failed',
        message:
          error.message || 'Invalid or expired verification code',
      };
    }

    // Return the session along with success
    return {
      status: 'success',
      message: 'Email verified successfully!',
      session: data.session ?? undefined,
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      status: 'failed',
      message: 'An unexpected error occurred',
    };
  }
}
