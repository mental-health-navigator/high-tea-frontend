import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
  type ClipboardEvent,
  type ChangeEvent,
} from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export interface VerificationCodeInputProps {
  /** Number of input fields (default: 6) */
  length?: number;
  /** Callback when all digits are entered */
  onComplete?: (code: string) => void;
  /** Callback when value changes */
  onChange?: (code: string) => void;
  /** Error state */
  error?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Auto-focus first input on mount */
  autoFocus?: boolean;
  /** Additional className for the container */
  className?: string;
  /** Placeholder for each input */
  placeholder?: string;
}

export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  length = 6,
  onComplete,
  onChange,
  error = false,
  disabled = false,
  autoFocus = true,
  className,
  placeholder = '•',
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const lastCompletedCodeRef = useRef<string | null>(null);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  // Memoize the completion handler to prevent duplicate calls
  const handleCompletion = useCallback(
    (code: string) => {
      if (lastCompletedCodeRef.current !== code) {
        lastCompletedCodeRef.current = code;
        onComplete?.(code);
      }
    },
    [onComplete],
  );

  useEffect(() => {
    const code = values.join('');
    onChange?.(code);

    if (code.length === length && values.every((v) => v !== '')) {
      handleCompletion(code);
    } else if (code.length < length) {
      // Reset when user starts editing
      lastCompletedCodeRef.current = null;
    }
  }, [values, length, onChange, handleCompletion]);

  const handleChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Only allow single digits
      if (value.length > 1) {
        e.target.value = value[0];
        return;
      }

      // Only allow numbers
      if (value && !/^\d$/.test(value)) {
        return;
      }

      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Auto-focus next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }
    };

  const handleKeyDown =
    (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
      // Handle backspace
      if (e.key === 'Backspace') {
        if (!values[index] && index > 0) {
          // If current input is empty, move to previous and clear it
          inputRefs.current[index - 1]?.focus();
          const newValues = [...values];
          newValues[index - 1] = '';
          setValues(newValues);
        } else {
          // Clear current input
          const newValues = [...values];
          newValues[index] = '';
          setValues(newValues);
        }
      }

      // Handle arrow keys
      if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    const digits = pastedData.match(/\d/g);

    if (digits) {
      const newValues = [...values];
      digits.forEach((digit, i) => {
        if (i < length) {
          newValues[i] = digit;
        }
      });
      setValues(newValues);

      // Focus the input after the last pasted digit, or the last input
      const nextIndex = Math.min(digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {Array.from({ length }, (_, index) => (
        <Input
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d{1}"
          maxLength={1}
          value={values[index]}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          onPaste={handlePaste}
          onFocus={handleFocus}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'w-12 h-12 text-center text-lg font-medium',
            'focus:ring-2 focus:ring-offset-2',
            error && 'border-destructive focus:ring-destructive',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};
