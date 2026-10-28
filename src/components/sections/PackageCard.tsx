"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { LazyVideo } from "@/components/ui/LazyVideo";
import type { Package } from "@/lib/types";
import { inr } from "@/lib/utils";

export function PackageCard({ pkg, index = 0 }: { pkg: Package; index?: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative isolate flex h-[30rem] flex-col overflow-hidden rounded-[2rem] bg-ink text-white shadow-2xl shadow-ink/20 sm:h-[34rem]"
    >
      <div className="absolute inset-0 -z-10 transition-transform duration-[1.2s] ease-out group-hover:scale-110">
        <LazyVideo src={pkg.cardVideo} className="size-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <div className="flex items-start justify-between p-5">
        <span className="glass rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest">{pkg.level}</span>
        {pkg.popular && (
          <span className="flex items-center gap-1 rounded-full bg-sunset px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest">
            <Icon name="star" className="size-3" /> Popular
          </span>
        )}
      </div>

      <div className="mt-auto p-6">
        <p className="flex items-center gap-4 text-xs font-medium text-white/70">
          <span className="flex items-center gap-1.5">
            <Icon name="clock" className="size-4 text-sunset" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="map-pin" className="size-4 text-sunset" />
            Bir Billing
          </span>
        </p>
        <h3 className="mt-3 text-3xl font-extrabold capitalize leading-[1.05]">{pkg.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/70 transition-all duration-500 sm:max-h-0 sm:opacity-0 sm:group-hover:max-h-20 sm:group-hover:opacity-100">
          {pkg.summary}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/15 pt-5">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/50">Starting from</p>
            <p className="font-display text-3xl font-extrabold">{inr(pkg.price)}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/packages/${pkg.slug}/`}
              className="rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold backdrop-blur-md transition hover:bg-white hover:text-ink"
            >
              Details
            </Link>
            <Link
              href={`/book/?package=${pkg.slug}`}
              className="flex items-center gap-1 rounded-full bg-sunset px-4 py-2.5 text-sm font-semibold transition hover:bg-ember"
            >
              Book <Icon name="arrow-up-right" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
      <Link href={`/packages/${pkg.slug}/`} className="absolute inset-0 -z-[5]" aria-label={pkg.title} tabIndex={-1} />
    </motion.article>
  );
}
