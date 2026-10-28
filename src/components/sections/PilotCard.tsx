"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Pilot } from "@/lib/types";
import { cn, media } from "@/lib/utils";

export function PilotCard({ pilot, index = 0 }: { pilot: Pilot; index?: number }) {
  const [img, setImg] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!hover || pilot.images.length < 2) return;
    const t = setInterval(() => setImg((i) => (i + 1) % pilot.images.length), 1400);
    return () => clearInterval(t);
  }, [hover, pilot.images.length]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-ink/5 ring-1 ring-ink/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={img}
            src={media(pilot.images[img])}
            alt={pilot.name}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 size-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md",
              pilot.status === "online" ? "bg-emerald-500/90 text-white" : "bg-amber-500/90 text-white",
            )}
          >
            <span className="size-1.5 animate-pulse rounded-full bg-white" />
            {pilot.status === "online" ? "Available" : "Busy"}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink">
            <Icon name="star" className="size-3.5 text-amber-500" /> {pilot.rating.toFixed(1)}
          </span>
        </div>

        {pilot.images.length > 1 && (
          <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 gap-1.5">
            {pilot.images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Photo ${i + 1}`}
                onClick={() => setImg(i)}
                className={cn("h-1.5 rounded-full transition-all", i === img ? "w-6 bg-white" : "w-1.5 bg-white/50")}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-sunset-2">{pilot.badge}</p>
          <h3 className="mt-1 flex items-center gap-2 text-2xl font-extrabold">
            {pilot.name}
            {pilot.instagram && (
              <a href={pilot.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${pilot.name} on Instagram`} className="text-white/70 hover:text-white">
                <Icon name="instagram" className="size-4" />
              </a>
            )}
          </h3>
          <p className="text-sm text-white/70">{pilot.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-ink/10 border-b border-ink/10">
        <div className="p-4 text-center">
          <p className="font-display text-2xl font-extrabold">{pilot.experience}+</p>
          <p className="text-xs text-muted">Years Exp.</p>
        </div>
        <div className="p-4 text-center">
          <p className="font-display text-2xl font-extrabold">{pilot.flights}</p>
          <p className="text-xs text-muted">Flights</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Icon name="map-pin" className="size-3.5 text-sunset" /> {pilot.location}
        </span>
        <Button href="/book/" size="sm" icon="arrow-up-right">
          Book
        </Button>
      </div>
    </motion.article>
  );
}
