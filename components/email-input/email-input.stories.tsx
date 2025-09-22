import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EmailInputUI } from './email-input-ui';

const meta: Meta<typeof EmailInputUI> = {
  title: 'Components/EmailInput',
  component: EmailInputUI,
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
type Story = StoryObj<typeof EmailInputUI>;

// Default state
export const Default: Story = {
  args: {
    onSubmit: (formData) => {
      console.log('Email submitted:', formData.get('email'));
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {
    isLoading: true,
    onSubmit: () => {},
  },
};

// Success state
export const Success: Story = {
  args: {
    isSuccessful: true,
    onSubmit: () => {},
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    isError: true,
    errorMessage: 'This email is already in use',
    onSubmit: () => {},
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
    onSubmit: (formData) => {
      console.log('Email:', formData.get('email'));
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
    onSubmit: (formData) => {
      console.log('Email:', formData.get('email'));
    },
  },
};
