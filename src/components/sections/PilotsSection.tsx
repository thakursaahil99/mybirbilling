"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PilotCard } from "./PilotCard";

export function PilotsSection({ limit, showAll = true }: { limit?: number; showAll?: boolean }) {
  const { pilots } = useSite();
  const list = [...pilots].sort((a, b) => a.order - b.order).slice(0, limit);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Meet Your Sky Guides"
          title="Experienced &"
          highlight="caring pilots"
          subtitle="Fly with certified professionals who are passionate about making your flight unforgettable — and perfectly safe."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <PilotCard key={p.id} pilot={p} index={i} />
          ))}
        </div>
        {showAll && (
          <div className="mt-12 flex justify-center">
            <Button href="/pilots/" variant="outline" size="lg" icon="arrow-right">
              View All Pilots
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
