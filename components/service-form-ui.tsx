'use client';


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ServiceFormUI({ className }: { className?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 1200);
    }, 1000);
  }

  return (
    <Card className={cn("max-w-md w-full mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-[20px]">Service Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="serviceName" className="font-medium">
            Service Name<span className="text-red-500">*</span>
            </label>
          <Input id="serviceName" placeholder="e.g., Youth Counselling Fitzroy" required className="rounded-[12px]" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="organization" className="font-medium">
            Organisation / Clinic
            </label>
          <Input id="organization" placeholder="e.g., ABC Health" className="rounded-[12px]" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="font-medium">
            Category / Type
            </label>
          <Input id="category" placeholder="e.g., Therapy" className="rounded-[12px]" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="eligibility" className="font-medium">
            Eligibility
            </label>
          <Input id="eligibility" placeholder="e.g., Ages 12-25, no referral, free" className="rounded-[12px]" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="font-medium">
            Address<span className="text-red-500">*</span>
            </label>
          <Input id="address" placeholder="Street, suburb, postcode / online" required className="rounded-[12px]" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="contact" className="font-medium">
            Contact Details<span className="text-red-500">*</span>
            </label>
          <Input id="contact" placeholder="Phone, website, and/or email" required className="rounded-[12px]" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="availability" className="font-medium">
            Availability / Hours
            </label>
          <Input id="availability" placeholder="e.g., Mon-Fri 9-5; waitlist 2 weeks" className="rounded-[12px]" />
          </div>
          <div className="flex gap-2 mt-4">
            <Button type="button" variant="outline" className="flex-1">Cancel</Button>
            <Button
              type="submit"
              className={cn("flex-1 transition-all", submitting && "opacity-70", submitted && "bg-green-500 text-white")}
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
