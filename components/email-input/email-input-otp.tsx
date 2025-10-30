'use client';

import { useState, type FormEvent } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { EmailSubmitButton } from './email-submit-button';

export interface EmailInputOtpProps {
  /** Callback when email is submitted */
  onSubmit: (email: string) => void;
  /** Label text for the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether submission is in progress */
  isLoading?: boolean;
  /** Success state */
  isSuccessful?: boolean;
  /** Error state */
  isError?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
  /** Initial email value */
  defaultValue?: string;
  /** Auto-focus on mount */
  autoFocus?: boolean;
}

/**
 * Email input component specifically for OTP verification flow
 * Simplified version without form action, uses callback instead
 */
export function EmailInputOtp({
  onSubmit,
  label = 'What is your email address?',
  placeholder = 'you@email.com',
  isLoading = false,
  isSuccessful = false,
  isError = false,
  errorMessage = 'Invalid email address',
  disabled = false,
  className = '',
  defaultValue = '',
  autoFocus = true,
}: EmailInputOtpProps) {
  const [email, setEmail] = useState(defaultValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && !isLoading && !isSuccessful) {
      onSubmit(email);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 mx-auto md:max-w-3xl w-full pb-4 md:pb-6 px-4 ${className}`}
    >
      <div className="flex flex-col gap-2 w-full relative">
        <Label
          htmlFor="email-otp"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          {label}
        </Label>
        <div className="relative">
          <Input
            id="email-otp"
            name="email"
            className={`bg-muted text-base md:text-base py-2 px-3 pr-10 h-auto ${
              isError ? 'border-destructive focus:ring-destructive' : ''
            }`}
            type="email"
            placeholder={placeholder}
            autoComplete="email"
            required
            autoFocus={autoFocus}
            disabled={disabled || isSuccessful || isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <EmailSubmitButton
            isSuccessful={isSuccessful}
            isLoading={isLoading}
          />
        </div>
        {isError && errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}
