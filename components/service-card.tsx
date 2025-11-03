'use client';

import type { ServiceData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Globe, MapPin, Clock, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceData;
  similarity?: number;
}

export function ServiceCard({ service, similarity }: ServiceCardProps) {
  const hasContactInfo =
    service.phone || service.email || service.website || service.address;

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">
              {service.name || 'Unnamed Service'}
            </CardTitle>
            {service.organisation && (
              <p className="text-sm text-muted-foreground mt-1">
                {service.organisation}
              </p>
            )}
            {service.campus_name && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {service.campus_name}
              </p>
            )}
          </div>
          {similarity !== undefined && (
            <div className="shrink-0 text-right">
              <div className="text-xs font-medium text-muted-foreground">
                Match
              </div>
              <div className="text-sm font-bold text-primary">
                {Math.round(similarity * 100)}%
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {service.eligibility_and_description && (
          <p className="text-sm text-foreground leading-relaxed">
            {service.eligibility_and_description}
          </p>
        )}

        {hasContactInfo && (
          <div className="space-y-2 pt-2 border-t">
            {service.address && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                <span>
                  {service.address}
                  {service.suburb && `, ${service.suburb}`}
                  {service.state && ` ${service.state}`}
                  {service.postcode && ` ${service.postcode}`}
                </span>
              </div>
            )}

            {service.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-4 text-muted-foreground" />
                <a
                  href={`tel:${service.phone}`}
                  className="hover:underline text-primary"
                >
                  {service.phone}
                </a>
              </div>
            )}

            {service.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="size-4 text-muted-foreground" />
                <a
                  href={`mailto:${service.email}`}
                  className="hover:underline text-primary truncate"
                >
                  {service.email}
                </a>
              </div>
            )}

            {service.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="size-4 text-muted-foreground" />
                <a
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-primary truncate"
                >
                  {service.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        )}

        {(service.costs ||
          service.expected_wait_time ||
          service.op_hours_24_7 ||
          service.op_hours_extended) && (
          <div className="space-y-1 pt-2 border-t">
            {service.costs && (
              <div className="flex items-start gap-2 text-sm">
                <DollarSign className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                <span>{service.costs}</span>
              </div>
            )}

            {service.expected_wait_time && (
              <div className="flex items-start gap-2 text-sm">
                <Clock className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                <span>Wait time: {service.expected_wait_time}</span>
              </div>
            )}

            {service.op_hours_24_7 && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="size-4 text-muted-foreground" />
                <span className="font-medium text-green-600 dark:text-green-400">
                  Open 24/7
                </span>
              </div>
            )}

            {service.op_hours_extended && service.op_hours_extended_details && (
              <div className="flex items-start gap-2 text-sm">
                <Clock className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
                <span>{service.op_hours_extended_details}</span>
              </div>
            )}
          </div>
        )}

        {(service.target_populations ||
          service.delivery_methods ||
          service.levels_of_care ||
          service.referral_pathways) && (
          <div className="pt-2 border-t space-y-1">
            {service.target_populations && (
              <div className="text-xs">
                <span className="font-medium">Target: </span>
                <span className="text-muted-foreground">
                  {service.target_populations}
                </span>
              </div>
            )}

            {service.delivery_methods && (
              <div className="text-xs">
                <span className="font-medium">Delivery: </span>
                <span className="text-muted-foreground">
                  {service.delivery_methods}
                </span>
              </div>
            )}

            {service.levels_of_care && (
              <div className="text-xs">
                <span className="font-medium">Care level: </span>
                <span className="text-muted-foreground">
                  {service.levels_of_care}
                </span>
              </div>
            )}

            {service.referral_pathways && (
              <div className="text-xs">
                <span className="font-medium">Referral: </span>
                <span className="text-muted-foreground">
                  {service.referral_pathways}
                </span>
              </div>
            )}
          </div>
        )}

        {service.notes && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground italic">
              {service.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
