"use client";

import { motion } from "motion/react";
import { useSite } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyUs() {
  const { settings } = useSite();
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-sunset/10 blur-[140px]" />
      {/* Mountain silhouette */}
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 w-full text-navy/70" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 220V140l120-60 110 50 150-110 140 90 90-40 160 100 130-70 150 60 120-80 160 90 110-30v80z" />
      </svg>

      <div className="container-x relative">
        <SectionHeading
          dark
          eyebrow="Why Choose Us"
          title="India's most trusted"
          highlight="paragliding crew"
          subtitle="Certified pilots, a flawless safety culture and one of the world's finest flying sites — right here in the Dhauladhars."
        />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {settings.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-500 hover:border-sunset/50 sm:p-8"
            >
              <span className="absolute -right-10 -top-10 size-32 rounded-full bg-sunset/0 blur-2xl transition-all duration-700 group-hover:bg-sunset/30" />
              <span className="grid size-12 place-items-center rounded-2xl bg-sunset/15 text-sunset transition-all duration-500 group-hover:scale-110 group-hover:bg-sunset group-hover:text-white sm:size-14">
                <Icon name={s.icon} className="size-6 sm:size-7" />
              </span>
              <p className="mt-6 font-display text-2xl font-extrabold sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-white/60 sm:text-base">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
