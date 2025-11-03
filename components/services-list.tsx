'use client';

import type { ServiceData } from '@/lib/types';
import { ServiceCard } from './service-card';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ServicesListProps {
  services: ServiceData[];
  top1Similarity?: number;
  disambiguationNeeded?: boolean;
  requestServiceChange?: boolean;
}

export function ServicesList({
  services,
  top1Similarity,
  disambiguationNeeded,
  requestServiceChange,
}: ServicesListProps) {
  if (!services || services.length === 0) {
    return null;
  }

  const getConfidenceLevel = (similarity: number) => {
    if (similarity >= 0.8) return { level: 'High', color: 'text-green-600' };
    if (similarity >= 0.6) return { level: 'Medium', color: 'text-yellow-600' };
    return { level: 'Low', color: 'text-orange-600' };
  };

  const confidence =
    top1Similarity !== undefined ? getConfidenceLevel(top1Similarity) : null;

  return (
    <div className="w-full space-y-4 bg-muted/30 rounded-lg p-4 border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {disambiguationNeeded ? (
              <>
                <AlertCircle className="size-5 text-yellow-600" />
                Multiple Options Available
              </>
            ) : (
              <>
                <CheckCircle className="size-5 text-green-600" />
                Recommended Services
              </>
            )}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {disambiguationNeeded
              ? 'Based on your needs, here are several services that might help. Please review and let me know if you need more specific recommendations.'
              : `Found ${services.length} ${services.length === 1 ? 'service' : 'services'} matching your needs`}
          </p>
        </div>

        {confidence && (
          <div className="shrink-0 text-right">
            <div className="text-xs text-muted-foreground">Confidence</div>
            <div className={`text-sm font-bold ${confidence.color}`}>
              {confidence.level}
            </div>
          </div>
        )}
      </div>

      {requestServiceChange && (
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md p-3">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            You can ask me to refine these results or find different services
            based on specific criteria like location, cost, or type of support.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {services.map((service, i) => (
          <ServiceCard
            key={`${i} + ${service.name}`}
            service={service}
            similarity={service.cosine_similarity ?? undefined}
          />
        ))}
      </div>

      {services.length >= 5 && (
        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground">
            Showing top {services.length} results. Ask me to refine the search
            if you need different options.
          </p>
        </div>
      )}
    </div>
  );
}
