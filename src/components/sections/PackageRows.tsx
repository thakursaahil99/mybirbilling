"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { usePackages } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LazyVideo } from "@/components/ui/LazyVideo";
import type { Package } from "@/lib/types";
import { cn, inr } from "@/lib/utils";

/** Large alternating rows; for courses a progress line connects the levels like a learning path. */
export function PackageRows({ category }: { category: "tandem" | "course" }) {
  const list = usePackages(category);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 sm:py-32">
      <div ref={ref} className="container-x relative">
        <div className="absolute bottom-0 left-[calc(1rem+1.5rem)] top-0 hidden w-px bg-ink/10 sm:left-[calc(1.5rem+1.5rem)] lg:left-1/2 lg:block">
          <motion.div style={{ height: line }} className="w-full bg-gradient-to-b from-sunset to-ember" />
        </div>
        <div className="space-y-20 lg:space-y-32">
          {list.map((p, i) => (
            <Row key={p.id} pkg={p} index={i} step={category === "course"} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ pkg, index, step }: { pkg: Package; index: number; step: boolean }) {
  const flip = index % 2 === 1;
  return (
    <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-24">
      <span className="absolute left-1/2 top-1/2 z-10 hidden size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink font-display text-lg font-bold text-white ring-8 ring-cream lg:grid">
        {String(index + 1).padStart(2, "0")}
      </span>
      <motion.div
        initial={{ opacity: 0, x: flip ? 80 : -80, rotate: flip ? 3 : -3 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={cn("relative h-80 overflow-hidden rounded-[2rem] bg-ink shadow-2xl sm:h-[28rem]", flip && "lg:order-2")}
      >
        <LazyVideo src={pkg.cardVideo} className="size-full object-cover" />
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-ink">{pkg.level}</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {step && <p className="eyebrow">Step {index + 1}</p>}
        <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">{pkg.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">{pkg.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-ink/5">
            <Icon name="clock" className="size-4 text-sunset" /> {pkg.duration}
          </span>
          {pkg.heroBadges.slice(1, 3).map((b) => (
            <span key={b} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-ink/5">
              <Icon name="check" className="size-4 text-sunset" /> {b}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">{pkg.priceUnit}</p>
            <p className="font-display text-4xl font-black">{inr(pkg.price)}</p>
          </div>
          <div className="flex gap-3">
            <Button href={`/book/?package=${pkg.slug}`} icon="arrow-up-right">
              Book Now
            </Button>
            <Link href={`/packages/${pkg.slug}/`} className="flex items-center gap-1 rounded-full px-4 py-3 text-sm font-semibold text-ink hover:text-sunset">
              Details <Icon name="arrow-right" className="size-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
