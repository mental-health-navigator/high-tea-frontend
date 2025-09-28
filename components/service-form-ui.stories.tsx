export const ErrorRequired: Story = {
  args: {
    errors: {
      serviceName: 'Service name is required',
      address: 'Address is required',
      contact: 'Contact details are required',
    },
  },
};

export const ErrorInvalidContact: Story = {
  args: {
    errors: {
      contact: 'Please enter a valid phone, email, or website',
    },
  },
};
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ServiceFormUI } from './service-form-ui';


const meta: Meta<typeof ServiceFormUI> = {
  title: 'Components/ServiceFormUI',
  component: ServiceFormUI,
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {
    submitting: true,
  },
};

export const Success: Story = {
  args: {
    submitted: true,
  },
};



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
  args: {},
};

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
  args: {},
};