"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { usePackages } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { PackageCard } from "./PackageCard";

const tabs = [
  { key: "all", label: "All Packages" },
  { key: "tandem", label: "Tandem Flights" },
  { key: "course", label: "Training Courses" },
] as const;

export function PackagesSection({
  showAllLink = true,
  initial = "all",
  heading,
}: {
  showAllLink?: boolean;
  initial?: "all" | "tandem" | "course";
  heading?: { eyebrow?: string; title: string; highlight?: string; subtitle?: string };
}) {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>(initial);
  const all = usePackages();
  const list = tab === "all" ? all : all.filter((p) => p.category === tab);

  return (
    <section id="packages" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={heading?.eyebrow ?? "Bir Billing Flying Packages"}
          title={heading?.title ?? "Choose your"}
          highlight={heading?.highlight ?? "sky adventure"}
          subtitle={
            heading?.subtitle ??
            "From quick joy rides to full P1–P4 certification — every flight with professional pilots, certified gear and memories on GoPro."
          }
        />

        <div className="mt-10 flex justify-center">
          <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                  tab === t.key ? "text-white" : "text-ink/60 hover:text-ink",
                )}
              >
                {tab === t.key && (
                  <motion.span layoutId="pkg-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <PackageCard key={p.id} pkg={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {showAllLink && (
          <div className="mt-12 flex justify-center">
            <Button href="/packages/" variant="outline" size="lg" icon="arrow-right">
              View All Packages
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
