'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2, CheckCircle2 } from 'lucide-react';

export interface ServiceFormUIProps {
  className?: string;
  submitting?: boolean;
  submitted?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  // Form values to display in submitted state
  formValues?: {
    organisation_name?: string;
    service_name?: string;
    campus_name?: string;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    eligibility_and_description?: string;
  };
  // Presentational errors for Storybook and UI
  errors?: Partial<
    Record<
      | 'organisation_name'
      | 'service_name'
      | 'campus_name'
      | 'phone'
      | 'email'
      | 'website'
      | 'address'
      | 'suburb'
      | 'state'
      | 'postcode'
      | 'eligibility_and_description',
      string
    >
  >;
}

export function ServiceFormUI({
  className,
  submitting = false,
  submitted = false,
  onSubmit,
  onCancel,
  onInputChange,
  formValues,
  errors,
}: ServiceFormUIProps) {
  // Helper to check if field has value
  const hasValue = (field: keyof NonNullable<typeof formValues>) => {
    return formValues?.[field] && formValues[field]?.trim() !== '';
  };

  return (
    <Card className={cn('max-w-2xl w-full mx-auto', className)}>
      <CardHeader>
        <CardTitle className="text-xl">Service Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Service Name */}
          {(!submitted || hasValue('service_name')) && (
            <div className="flex flex-col gap-1">
              <label htmlFor="service_name" className="font-medium text-sm">
                Service Name
                {!submitted && <span className="text-red-500">*</span>}
              </label>
              <Input
                id="service_name"
                name="service_name"
                placeholder="e.g. Youth Counselling"
                required={!submitted}
                disabled={submitted}
                value={formValues?.service_name || ''}
                onChange={onInputChange}
                readOnly={submitted}
                aria-invalid={!!errors?.service_name || undefined}
                aria-describedby={
                  errors?.service_name ? 'service_name-error' : undefined
                }
                className={cn(
                  'rounded-lg',
                  errors?.service_name &&
                    'border-red-500 focus-visible:ring-red-500',
                  submitted &&
                    'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                )}
              />
              {errors?.service_name && (
                <p id="service_name-error" className="text-sm text-red-600">
                  {errors.service_name}
                </p>
              )}
            </div>
          )}

          {/* Organisation Name & Campus Name - Side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(!submitted || hasValue('organisation_name')) && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="organisation_name"
                  className="font-medium text-sm"
                >
                  Organisation / Clinic
                </label>
                <Input
                  id="organisation_name"
                  name="organisation_name"
                  placeholder="e.g. Headspace"
                  disabled={submitted}
                  value={formValues?.organisation_name || ''}
                  onChange={onInputChange}
                  readOnly={submitted}
                  className={cn(
                    'rounded-lg',
                    submitted &&
                      'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
              </div>
            )}

            {(!submitted || hasValue('campus_name')) && (
              <div className="flex flex-col gap-1">
                <label htmlFor="campus_name" className="font-medium text-sm">
                  Campus / Branch
                </label>
                <Input
                  id="campus_name"
                  name="campus_name"
                  placeholder="e.g. Fitzroy"
                  disabled={submitted}
                  value={formValues?.campus_name || ''}
                  onChange={onInputChange}
                  readOnly={submitted}
                  className={cn(
                    'rounded-lg',
                    submitted &&
                      'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
              </div>
            )}
          </div>

          {/* Contact Details - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(!submitted || hasValue('phone')) && (
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="font-medium text-sm">
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  disabled={submitted}
                  value={formValues?.phone || ''}
                  onChange={onInputChange}
                  readOnly={submitted}
                  className={cn(
                    'rounded-lg',
                    submitted &&
                      'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
              </div>
            )}

            {(!submitted || hasValue('email')) && (
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-medium text-sm">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  disabled={submitted}
                  value={formValues?.email || ''}
                  onChange={onInputChange}
                  readOnly={submitted}
                  className={cn(
                    'rounded-lg',
                    submitted &&
                      'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
              </div>
            )}

            {(!submitted || hasValue('website')) && (
              <div className="flex flex-col gap-1">
                <label htmlFor="website" className="font-medium text-sm">
                  Website
                </label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  disabled={submitted}
                  value={formValues?.website || ''}
                  onChange={onInputChange}
                  readOnly={submitted}
                  className={cn(
                    'rounded-lg',
                    submitted &&
                      'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
              </div>
            )}
          </div>

          {/* Address */}
          {(!submitted || hasValue('address')) && (
            <div className="flex flex-col gap-1">
              <label htmlFor="address" className="font-medium text-sm">
                Street Address
                {!submitted && <span className="text-red-500">*</span>}
              </label>
              <Input
                id="address"
                name="address"
                placeholder="e.g. 123 Main Street"
                required={!submitted}
                disabled={submitted}
                value={formValues?.address || ''}
                onChange={onInputChange}
                readOnly={submitted}
                className={cn(
                  'rounded-lg',
                  submitted &&
                    'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                )}
              />
            </div>
          )}

          {/* Suburb, State, Postcode - Grid */}
          <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-4">
            {(!submitted || hasValue('suburb')) && (
              <div className="flex flex-col gap-1">
                <label htmlFor="suburb" className="font-medium text-sm">
                  Suburb
                </label>
                <Input
                  id="suburb"
                  name="suburb"
                  placeholder="e.g. Fitzroy"
                  disabled={submitted}
                  value={formValues?.suburb || ''}
                  onChange={onInputChange}
                  readOnly={submitted}
                  className={cn(
                    'rounded-lg',
                    submitted &&
                      'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
              </div>
            )}

            {(!submitted || hasValue('state')) && (
              <div className="flex flex-col gap-1">
                <label htmlFor="state" className="font-medium text-sm">
                  State
                </label>
                <Input
                  id="state"
                  name="state"
                  placeholder="VIC"
                  maxLength={3}
                  disabled={submitted}
                  value={formValues?.state || ''}
                  onChange={onInputChange}
                  readOnly={submitted}
                  className={cn(
                    'rounded-lg',
                    submitted &&
                      'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
              </div>
            )}

            {(!submitted || hasValue('postcode')) && (
              <div className="flex flex-col gap-1">
                <label htmlFor="postcode" className="font-medium text-sm">
                  Postcode
                </label>
                <Input
                  id="postcode"
                  name="postcode"
                  placeholder="e.g. 3065"
                  maxLength={4}
                  disabled={submitted}
                  value={formValues?.postcode || ''}
                  onChange={onInputChange}
                  readOnly={submitted}
                  className={cn(
                    'rounded-lg',
                    submitted &&
                      'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
              </div>
            )}
          </div>

          {/* Eligibility and Description */}
          {(!submitted || hasValue('eligibility_and_description')) && (
            <div className="flex flex-col gap-1">
              <label
                htmlFor="eligibility_and_description"
                className="font-medium text-sm"
              >
                Eligibility & Description
              </label>
              <Textarea
                id="eligibility_and_description"
                name="eligibility_and_description"
                placeholder="e.g. Ages 12-25, no referral required, bulk-billed"
                rows={3}
                disabled={submitted}
                value={formValues?.eligibility_and_description || ''}
                onChange={onInputChange}
                readOnly={submitted}
                className={cn(
                  'rounded-lg resize-none',
                  submitted &&
                    'border-0 bg-transparent px-0 cursor-default focus-visible:ring-0 focus-visible:ring-offset-0',
                )}
              />
            </div>
          )}

          {!submitted && (
            <div className="flex gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onCancel}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={cn(
                  'flex-1 transition-all',
                  submitting && 'opacity-90',
                )}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          )}

          {submitted && (
            <div className="flex items-center justify-center gap-2 mt-4 text-green-600 font-medium">
              <CheckCircle2 className="size-5" />
              <span>Submitted</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
