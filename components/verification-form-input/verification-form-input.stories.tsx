import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { VerificationCodeInput } from './verification-form-input';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof VerificationCodeInput> = {
  title: 'Components/VerificationCodeInput',
  component: VerificationCodeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: { type: 'number', min: 4, max: 8 },
      description: 'Number of input fields',
      defaultValue: 6,
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all inputs',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus first input on mount',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder character for empty inputs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VerificationCodeInput>;

// Basic example
export const Default: Story = {
  args: {
    length: 6,
    autoFocus: true,
    placeholder: '•',
  },
};

// Interactive example with complete flow
export const Interactive: Story = {
  render: (args) => {
    const [code, setCode] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState(false);

    const handleComplete = async (code: string) => {
      setIsVerifying(true);
      setError(false);

      // Simulate API call
      setTimeout(() => {
        if (code === '123456') {
          setIsComplete(true);
        } else {
          setError(true);
        }
        setIsVerifying(false);
      }, 1000);
    };

    const handleResend = () => {
      setCode('');
      setIsComplete(false);
      setError(false);
      // In a real app, this would trigger a new code to be sent
      alert('New code sent to your email!');
    };

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            We&apos;ve sent a 6-digit code to your email. Enter it below to
            verify your account.
            <br />
            <span className="text-xs text-muted-foreground mt-2 block">
              (Hint: Try &quot;123456&quot; for success)
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <VerificationCodeInput
            {...args}
            onChange={setCode}
            onComplete={handleComplete}
            disabled={isVerifying || isComplete}
            error={error}
          />

          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                Invalid code. Please check and try again.
              </AlertDescription>
            </Alert>
          )}

          {isComplete && (
            <Alert>
              <AlertDescription className="text-green-600">
                ✓ Email verified successfully!
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center">
            <Button
              variant="link"
              size="sm"
              onClick={handleResend}
              disabled={isVerifying}
            >
              Resend code
            </Button>

            {code.length === 6 && (
              <span className="text-sm text-muted-foreground">
                Code: {code}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
};

// Error state example
export const WithError: Story = {
  args: {
    error: true,
    length: 6,
  },
  decorators: [
    (Story) => (
      <div className="space-y-2">
        <Story />
        <p className="text-sm text-destructive">
          The verification code is incorrect. Please try again.
        </p>
      </div>
    ),
  ],
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    length: 6,
  },
};

// Different lengths
export const FourDigits: Story = {
  args: {
    length: 4,
  },
};

export const EightDigits: Story = {
  args: {
    length: 8,
  },
};

// With custom styling
export const CustomStyling: Story = {
  render: (args) => {
    return (
      <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-purple-900">
          Enter Verification Code
        </h3>
        <VerificationCodeInput {...args} className="gap-3" />
        <p className="text-sm text-purple-700 mt-4">
          Check your email for the verification code
        </p>
      </div>
    );
  },
};

// Full form example
export const InForm: Story = {
  render: (args) => {
    const [step, setStep] = useState<'email' | 'verify'>('verify');

    return (
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create your account in just a few steps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'verify' && (
            <>
              <div className="space-y-2">
                <span className="text-sm font-medium">Verification Code</span>
                <VerificationCodeInput
                  {...args}
                  onComplete={(code) => {
                    console.log('Code completed:', code);
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the 6-digit code sent to john@example.com
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">Verify & Continue</Button>
                <Button variant="outline">Back</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  },
};
