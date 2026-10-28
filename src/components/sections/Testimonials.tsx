"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { testimonials } = useSite();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + n) % n);
  };

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, n]);

  if (!n) return null;
  const t = testimonials[i];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-x">
        <SectionHeading eyebrow="Every Journey, A New Story" title="Collect moments," highlight="not things" subtitle="Read the travelogues of our adventurers." />

        <div className="relative mx-auto mt-14 max-w-4xl">
          <Icon name="quote" className="absolute -left-2 -top-8 size-24 text-sunset/15 sm:-left-12" />
          <div className="relative min-h-[18rem] sm:min-h-[15rem]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={t.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: dir * -60, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  if (info.offset.x > 60) go(-1);
                }}
                className="cursor-grab text-center active:cursor-grabbing"
              >
                <div className="flex justify-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Icon key={k} name="star" className="size-5" />
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-center gap-3">
                  <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-sunset to-ember font-display text-lg font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span className="text-left">
                    <span className="block font-bold">{t.name}</span>
                    <span className="block text-sm text-muted">{t.city}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button type="button" aria-label="Previous" onClick={() => go(-1)} className="grid size-12 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-white">
              <Icon name="arrow-left" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((x, k) => (
                <button
                  key={x.id}
                  type="button"
                  aria-label={`Testimonial ${k + 1}`}
                  onClick={() => {
                    setDir(k > i ? 1 : -1);
                    setI(k);
                  }}
                  className="relative h-1.5 w-8 overflow-hidden rounded-full bg-ink/10"
                >
                  {k === i && (
                    <motion.span
                      key={i + (paused ? "p" : "")}
                      className={cn("absolute inset-y-0 left-0 rounded-full bg-sunset")}
                      initial={{ width: paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused ? 0 : 6, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button type="button" aria-label="Next" onClick={() => go(1)} className="grid size-12 place-items-center rounded-full border border-ink/15 transition hover:bg-ink hover:text-white">
              <Icon name="arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
