import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OtpFlow } from './otp-flow';

const meta: Meta<typeof OtpFlow> = {
  title: 'Components/OtpFlow',
  component: OtpFlow,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="min-w-[400px] max-w-3xl">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OtpFlow>;

// Default state - shows email input
export const Default: Story = {
  args: {
    onVerified: (email) => {
      console.log('Email verified:', email);
    },
    onError: (error) => {
      console.error('Verification error:', error);
    },
  },
};

// Custom labels
export const CustomLabels: Story = {
  args: {
    emailLabel: 'Enter your email to receive a verification code',
    codeLabel: 'Verify your identity',
    onVerified: (email) => {
      console.log('Email verified:', email);
    },
  },
};

// Without auto-focus
export const NoAutoFocus: Story = {
  args: {
    autoFocus: false,
    onVerified: (email) => {
      console.log('Email verified:', email);
    },
  },
};

// Dark mode
export const Dark: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-zinc-900 p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
  args: {
    onVerified: (email) => {
      console.log('Email verified:', email);
    },
  },
};

// Mobile view
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
  args: {
    onVerified: (email) => {
      console.log('Email verified:', email);
    },
  },
};

// Inline in a modal context
export const InlineModal: Story = {
  decorators: [
    (Story) => (
      <div className="bg-background border rounded-lg shadow-lg p-6 max-w-md">
        <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
        <p className="text-muted-foreground mb-6">
          We need to verify your email address before continuing.
        </p>
        <Story />
      </div>
    ),
  ],
  args: {
    onVerified: (email) => {
      console.log('Email verified:', email);
      alert(`Email verified: ${email}`);
    },
  },
};
