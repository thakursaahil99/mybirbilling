"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Counter, SplitText } from "@/components/ui/Motion";
import { media } from "@/lib/utils";

/** Two tilted rows of flyer photos sliding in opposite directions as you scroll. */
export function PhotoWall() {
  const { gallery } = useSite();
  const photos = gallery.filter((g) => g.type === "photo");
  const half = Math.ceil(photos.length / 2);
  const rows = [photos.slice(0, half), photos.slice(half)];

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x relative z-10 text-center">
        <p className="eyebrow justify-center">
          <span className="h-px w-6 bg-current" /> Happy Flyers <span className="h-px w-6 bg-current" />
        </p>
        <h2 className="mt-4 text-5xl font-black leading-none sm:text-7xl">
          <Counter to={10000} suffix="+" className="text-gradient" />
          <br />
          <SplitText text="smiles in the sky" />
        </h2>
      </div>

      <div className="mt-14 -rotate-3 space-y-4 sm:space-y-5">
        {rows.map((row, r) => (
          <motion.div key={r} style={{ x: r === 0 ? x1 : x2 }} className="flex w-max gap-4 sm:gap-5">
            {[...row, ...row].map((p, i) => (
              <motion.div
                key={p.id + "-" + i}
                whileHover={{ scale: 1.06, rotate: i % 2 ? 2 : -2, zIndex: 10 }}
                className="relative h-52 w-40 shrink-0 overflow-hidden rounded-3xl shadow-xl shadow-ink/10 sm:h-72 sm:w-56"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media(p.src)} alt={p.title} loading="lazy" className="size-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Button href="/gallery/" variant="dark" size="lg" icon="arrow-up-right">
          Open the Gallery
        </Button>
      </div>
    </section>
  );
}
