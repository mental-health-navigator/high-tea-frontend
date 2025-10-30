'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ServiceFormUI } from './service-form-ui';
import { ingestJson, type IngestResponse } from '@/lib/api/ingestion';
import { toast } from 'sonner';

export interface ServiceFormContainerProps {
  className?: string;
  onSuccess?: (data: IngestResponse) => void;
  onCancel?: () => void;
}

export function ServiceFormContainer({
  className,
  onSuccess,
  onCancel,
}: ServiceFormContainerProps) {
  const [formData, setFormData] = useState({
    organisation_name: '',
    service_name: '',
    campus_name: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    eligibility_and_description: '',
  });

  // React Query mutation for JSON ingestion
  const mutation = useMutation({
    mutationFn: (payload: typeof formData) => ingestJson(payload),
    onSuccess: (data) => {
      if (data.status === 'created') {
        toast.success('Service created successfully!', {
          description: `Reference ID: ${data.reference_id}`,
        });
      } else {
        toast.error('Service ingestion failed', {
          description: data.message,
        });
      }

      // Log the response for debugging
      console.log('Ingestion response:', data);
      if (data.warnings.length > 0) {
        console.log('Warnings:', data.warnings);
      }
      if (data.errors.length > 0) {
        console.log('Errors:', data.errors);
      }

      // Call the success callback if provided
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      toast.error('Failed to submit service data', {
        description: error.message,
      });
      console.error('Ingestion error:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create payload, filtering out empty strings
    const payload: Record<string, any> = {};

    for (const [key, value] of Object.entries(formData)) {
      if (value && value.trim() !== '') {
        payload[key] = value;
      }
    }

    console.log('Submitting payload:', payload);

    // Trigger the mutation
    mutation.mutate(formData);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      organisation_name: '',
      service_name: '',
      campus_name: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      suburb: '',
      state: '',
      postcode: '',
      eligibility_and_description: '',
    });

    // Call the cancel callback if provided
    onCancel?.();
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <ServiceFormUI
      className={className}
      submitting={mutation.isPending}
      submitted={mutation.isSuccess}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      formValues={formData}
      onInputChange={handleInputChange}
    />
  );
}
