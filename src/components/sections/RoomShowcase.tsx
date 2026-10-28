"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Stay } from "@/lib/types";
import { cn, inr, media } from "@/lib/utils";

function RoomSlider({ stay }: { stay: Stay }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = stay.images.length;

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 4000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div className="group relative h-72 overflow-hidden rounded-[1.75rem] bg-sand sm:h-[26rem]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence initial={false}>
        <motion.img
          key={i}
          src={media(stay.images[i])}
          alt={`${stay.title} photo ${i + 1}`}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) setI((v) => (v + 1) % n);
            if (info.offset.x > 50) setI((v) => (v - 1 + n) % n);
          }}
          className="absolute inset-0 size-full cursor-grab object-cover active:cursor-grabbing"
          draggable={false}
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
      {stay.popular && (
        <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-sunset px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
          <Icon name="star" className="size-3" /> Most booked
        </span>
      )}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {stay.images.map((_, k) => (
          <button key={k} type="button" aria-label={`Photo ${k + 1}`} onClick={() => setI(k)} className={cn("h-1.5 rounded-full transition-all", k === i ? "w-7 bg-white" : "w-1.5 bg-white/60")} />
        ))}
      </div>
      {n > 1 &&
        [
          { d: -1, icon: "chevron-left", cls: "left-3" },
          { d: 1, icon: "chevron-right", cls: "right-3" },
        ].map((b) => (
          <button
            key={b.d}
            type="button"
            aria-label={b.d < 0 ? "Previous photo" : "Next photo"}
            onClick={() => setI((v) => (v + b.d + n) % n)}
            className={`absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink opacity-0 shadow-lg transition group-hover:opacity-100 ${b.cls}`}
          >
            <Icon name={b.icon} className="size-5" />
          </button>
        ))}
    </div>
  );
}

export function RoomShowcase() {
  const { stays } = useSite();
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Rooms & Camps" title="Find your" highlight="perfect stay" subtitle="From backpacker bunks to premium rooms with mountain views — every stay is hand-picked and minutes from the landing site." />
        <div className="mt-16 space-y-16 lg:space-y-24">
          {stays.map((stay, i) => (
            <div key={stay.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <RoomSlider stay={stay} />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="eyebrow">{stay.tagline}</p>
                <h3 className="mt-3 text-4xl font-black sm:text-5xl">{stay.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{stay.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {stay.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium shadow-sm ring-1 ring-ink/5">
                      <Icon name="check" className="size-4 text-sunset" /> {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <div>
                    <p className="font-display text-4xl font-black">{inr(stay.price)}</p>
                    <p className="text-sm text-muted">
                      per {stay.pricing === "person" ? "person" : "room"} / night{stay.pricing === "room" && ` · sleeps ${stay.capacity}`}
                    </p>
                  </div>
                  <Link
                    href={`/stay/?stay=${stay.slug}#plan`}
                    scroll={false}
                    onClick={() => document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" })}
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sunset"
                  >
                    Add to my trip
                    <Icon name="plus" className="size-4 transition group-hover:rotate-90" />
                  </Link>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
