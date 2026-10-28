"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn, media } from "@/lib/utils";

const filters = [
  { key: "all", label: "All", icon: "grid" },
  { key: "video", label: "Videos", icon: "video" },
  { key: "photo", label: "Photos", icon: "image" },
] as const;

export function GalleryGrid() {
  const { gallery } = useSite();
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const [open, setOpen] = useState<number | null>(null);
  const items = filter === "all" ? gallery : gallery.filter((g) => g.type === filter);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-muted">
            <span className="font-display text-2xl font-bold text-ink">{items.length}</span> moments captured over Bir Billing
          </p>
          <div className="flex gap-1 rounded-full bg-white p-1.5 shadow-lg shadow-ink/5 ring-1 ring-ink/5">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cn("relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", filter === f.key ? "text-white" : "text-ink/60 hover:text-ink")}
              >
                {filter === f.key && <motion.span layoutId="gal-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                <Icon name={f.icon} className="relative size-4" />
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-10 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.button
                layout
                key={g.id}
                type="button"
                data-cursor={g.type === "video" ? "Play" : "View"}
                onClick={() => setOpen(i)}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl bg-sand",
                  i % 7 === 0 && "row-span-2",
                  i % 7 === 3 && "sm:col-span-2",
                  g.type === "video" && i % 7 !== 3 && "row-span-2",
                )}
              >
                {g.type === "video" ? (
                  <LazyVideo src={g.src} className="size-full object-cover transition duration-700 group-hover:scale-110" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={media(g.src)} alt={g.title} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-110" />
                )}
                <span className="absolute inset-0 bg-ink/0 transition duration-500 group-hover:bg-ink/30" />
                <span className="absolute left-3 top-3 grid size-9 place-items-center rounded-full bg-white/85 text-ink backdrop-blur-md">
                  <Icon name={g.type === "video" ? "play" : "image"} className="size-4" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}
