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

export const WithValues: Story = {
  args: {
    formValues: {
      service_name: 'Youth Counselling',
      organisation_name: 'Headspace',
      campus_name: 'Fitzroy',
      phone: '+61412345678',
      email: 'contact@headspace.org.au',
      website: 'https://headspace.org.au',
      address: '123 Main Street',
      suburb: 'Fitzroy',
      state: 'VIC',
      postcode: '3065',
      eligibility_and_description: 'Ages 12-25, no referral required, bulk-billed',
    },
  },
};

export const Loading: Story = {
  args: {
    submitting: true,
    formValues: {
      service_name: 'Youth Counselling',
      address: '123 Main Street',
    },
  },
};

export const Success: Story = {
  args: {
    submitted: true,
    formValues: {
      service_name: 'Youth Counselling',
      organisation_name: 'Headspace',
      campus_name: 'Fitzroy',
      phone: '+61412345678',
      email: 'contact@headspace.org.au',
      website: 'https://headspace.org.au',
      address: '123 Main Street',
      suburb: 'Fitzroy',
      state: 'VIC',
      postcode: '3065',
      eligibility_and_description: 'Ages 12-25, no referral required, bulk-billed',
    },
  },
};

export const SuccessPartialData: Story = {
  args: {
    submitted: true,
    formValues: {
      service_name: 'Youth Counselling',
      organisation_name: 'Headspace',
      phone: '+61412345678',
      address: '123 Main Street',
      state: 'VIC',
      postcode: '3065',
    },
  },
};

export const ErrorRequired: Story = {
  args: {
    errors: {
      service_name: 'Service name is required',
      address: 'Address is required',
    },
    formValues: {
      organisation_name: 'Headspace',
      phone: '+61412345678',
    },
  },
};

export const ErrorInvalidContact: Story = {
  args: {
    errors: {
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
    },
    formValues: {
      service_name: 'Youth Counselling',
      email: 'invalid-email',
      phone: 'abc',
    },
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
