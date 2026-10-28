"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { Lightbox } from "@/components/ui/Lightbox";
import { SplitText } from "@/components/ui/Motion";
import { cn, media } from "@/lib/utils";

/** Pinned section: vertical scroll drives a horizontal strip of featured moments. */
export function MomentsSection() {
  const { gallery } = useSite();
  const items = gallery.filter((g) => g.featured);
  const ref = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (strip.current) setDistance(Math.max(0, strip.current.scrollWidth - window.innerWidth + 32));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-ink text-white">
      <div className="grain sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="container-x flex flex-col justify-between gap-6 pb-10 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" /> Moments in the Sky
            </span>
            <h2 className="mt-4 text-5xl font-extrabold leading-none sm:text-7xl">
              <SplitText text="Real flights." />
              <br />
              <SplitText text="Real smiles." delay={0.2} wordClassName="text-gradient italic font-black" />
            </h2>
          </div>
          <Button href="/gallery/" variant="ghost-light" icon="arrow-right">
            View Our Memories
          </Button>
        </div>

        <motion.div ref={strip} style={{ x }} className="flex w-max gap-5 pl-4 sm:pl-[max(1.5rem,calc((100vw-80rem)/2+2rem))]">
          {items.map((g, i) => (
            <button
              key={g.id}
              type="button"
              data-cursor={g.type === "video" ? "Play" : "View"}
              onClick={() => setOpen(i)}
              className={cn(
                "group relative h-[50vh] shrink-0 overflow-hidden rounded-[2rem] bg-navy",
                i % 3 === 0 ? "w-[70vw] sm:w-[34rem]" : "w-[55vw] sm:w-[24rem]",
                i % 2 ? "mt-12" : "",
              )}
            >
              {g.type === "video" ? (
                <LazyVideo src={g.src} className="size-full object-cover transition duration-700 group-hover:scale-105" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={media(g.src)} alt={g.title} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-60 transition group-hover:opacity-90" />
              <span className="absolute bottom-5 left-5 flex items-center gap-2 text-sm font-semibold">
                <span className="grid size-9 place-items-center rounded-full bg-white/20 backdrop-blur-md">
                  <Icon name={g.type === "video" ? "play" : "image"} className="size-4" />
                </span>
                {g.type === "video" ? "Watch flight" : "View photo"}
              </span>
            </button>
          ))}
        </motion.div>
      </div>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </section>
  );
}
