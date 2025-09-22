// Pure UI Component

'use client';
import Form from 'next/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { EmailSubmitButton } from './email-submit-button';

export interface EmailInputUIProps {
  onSubmit: (formData: FormData) => void;
  label?: string;
  placeholder?: string;
  isSuccessful?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  autoFocus?: boolean;
}

export function EmailInputUI({
  onSubmit,
  label = 'What is your email address?',
  placeholder = 'you@email.com',
  isSuccessful = false,
  isLoading = false,
  isError = false,
  errorMessage = 'Invalid email address',
  disabled = false,
  className = '',
  value,
  autoFocus = true,
}: EmailInputUIProps) {
  return (
    <Form
      action={onSubmit}
      className={`flex flex-col gap-4 mx-auto md:max-w-3xl w-full pb-4 md:pb-6 px-4 ${className}`}
    >
      <div className="flex flex-col gap-2 w-full relative">
        <Label
          htmlFor="email"
          className="text-zinc-600 font-normal dark:text-zinc-400"
        >
          {label}
        </Label>
        <div className="relative">
          <Input
            id="email"
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
            defaultValue={value}
          />
          <EmailSubmitButton
            isSuccessful={isSuccessful}
            isLoading={isLoading}
          />
        </div>
        {isError && errorMessage && (
          <p className="text-sm text-destructive mt-1">{errorMessage}</p>
        )}
      </div>
    </Form>
  );
}
