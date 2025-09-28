'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ServiceFormUIProps {
  className?: string;
  submitting?: boolean;
  submitted?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  // Presentational errors for Storybook and UI
  errors?: Partial<Record<
    'serviceName' | 'organization' | 'category' | 'eligibility' | 'address' | 'contact' | 'availability',
    string
  >>;
}

export function ServiceFormUI({
  className,
  submitting = false,
  submitted = false,
  onSubmit,
  onCancel,
  errors,
}: ServiceFormUIProps) {
  return (
    <Card className={cn("max-w-md w-full mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-xl">Service Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Service Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="serviceName" className="font-medium">
              Service Name<span className="text-red-500">*</span>
            </label>
            <Input
              id="serviceName"
              placeholder="e.g., Youth Counselling Fitzroy"
              required
              aria-invalid={!!errors?.serviceName || undefined}
              aria-describedby={errors?.serviceName ? "serviceName-error" : undefined}
              className={cn(
                "rounded-lg",
                errors?.serviceName && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors?.serviceName && (
              <p id="serviceName-error" className="text-sm text-red-600">{errors.serviceName}</p>
            )}
          </div>
          {/* Organisation / Clinic */}
          <div className="flex flex-col gap-1">
            <label htmlFor="organization" className="font-medium">Organisation / Clinic</label>
            <Input
              id="organization"
              placeholder="e.g., ABC Health"
              aria-invalid={!!errors?.organization || undefined}
              aria-describedby={errors?.organization ? "organization-error" : undefined}
              className={cn(
                "rounded-lg",
                errors?.organization && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors?.organization && (
              <p id="organization-error" className="text-sm text-red-600">{errors.organization}</p>
            )}
          </div>
          {/* Category / Type */}
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="font-medium">Category / Type</label>
            <Input
              id="category"
              placeholder="e.g., Therapy"
              aria-invalid={!!errors?.category || undefined}
              aria-describedby={errors?.category ? "category-error" : undefined}
              className={cn(
                "rounded-lg",
                errors?.category && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors?.category && (
              <p id="category-error" className="text-sm text-red-600">{errors.category}</p>
            )}
          </div>
          {/* Eligibility */}
          <div className="flex flex-col gap-1">
            <label htmlFor="eligibility" className="font-medium">Eligibility</label>
            <Input
              id="eligibility"
              placeholder="e.g., Ages 12-25, no referral, free"
              aria-invalid={!!errors?.eligibility || undefined}
              aria-describedby={errors?.eligibility ? "eligibility-error" : undefined}
              className={cn(
                "rounded-lg",
                errors?.eligibility && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors?.eligibility && (
              <p id="eligibility-error" className="text-sm text-red-600">{errors.eligibility}</p>
            )}
          </div>
          {/* Address */}
          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="font-medium">
              Address<span className="text-red-500">*</span>
            </label>
            <Input
              id="address"
              placeholder="Street, suburb, postcode / online"
              required
              aria-invalid={!!errors?.address || undefined}
              aria-describedby={errors?.address ? "address-error" : undefined}
              className={cn(
                "rounded-lg",
                errors?.address && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors?.address && (
              <p id="address-error" className="text-sm text-red-600">{errors.address}</p>
            )}
          </div>
          {/* Contact */}
          <div className="flex flex-col gap-1">
            <label htmlFor="contact" className="font-medium">
              Contact Details<span className="text-red-500">*</span>
            </label>
            <Input
              id="contact"
              placeholder="Phone, website, and/or email"
              required
              aria-invalid={!!errors?.contact || undefined}
              aria-describedby={errors?.contact ? "contact-error" : undefined}
              className={cn(
                "rounded-lg",
                errors?.contact && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors?.contact && (
              <p id="contact-error" className="text-sm text-red-600">{errors.contact}</p>
            )}
          </div>
          {/* Availability */}
          <div className="flex flex-col gap-1">
            <label htmlFor="availability" className="font-medium">Availability / Hours</label>
            <Input
              id="availability"
              placeholder="e.g., Mon-Fri 9-5; waitlist 2 weeks"
              aria-invalid={!!errors?.availability || undefined}
              aria-describedby={errors?.availability ? "availability-error" : undefined}
              className={cn(
                "rounded-lg",
                errors?.availability && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors?.availability && (
              <p id="availability-error" className="text-sm text-red-600">{errors.availability}</p>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
            <Button
              type="submit"
              className={cn(
                "flex-1 transition-all",
                submitting && "opacity-70",
                submitted && "bg-green-500 text-white"
              )}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : submitted ? "Submitted!" : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
