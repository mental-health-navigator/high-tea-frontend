import type { Meta, StoryObj } from '@storybook/nextjs';
import { CSVUploader } from './csv-uploader-ui';

const meta: Meta<typeof CSVUploader> = {
  title: 'Components/CSVUploader',
  component: CSVUploader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onFileSelect: { action: 'file selected' },
    onDownloadTemplate: { action: 'download template clicked' },
    onCancel: { action: 'cancel clicked' },
    onDragOver: { action: 'drag over' },
    onDragLeave: { action: 'drag leave' },
    onDrop: { action: 'drop' },
    onClick: { action: 'clicked' },
    className: { control: 'text' },
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    disabled: { control: 'boolean' },
    isDragOver: { control: 'boolean' },
    selectedFileName: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSelectedFile: Story = {
  args: {
    selectedFileName: 'sample-data.csv',
  },
};

export const DragOver: Story = {
  args: {
    isDragOver: true,
  },
};

export const WithError: Story = {
  args: {
    error: 'File size too large. Please select a file under 10MB.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    selectedFileName: 'sample-data.csv',
  },
};

export const ErrorWrongFileType: Story = {
  args: {
    error: 'Invalid file type. Please select a CSV file.',
  },
};

export const DarkMode: Story = {
  args: {
    selectedFileName: 'sample-data.csv',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};