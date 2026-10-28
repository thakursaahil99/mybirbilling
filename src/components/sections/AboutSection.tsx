"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { Counter, Reveal, SplitText } from "@/components/ui/Motion";
import { media, telLink } from "@/lib/utils";

const services = [
  { icon: "parachute", title: "Tandem Paragliding", text: "Fly with certified pilots — no experience needed." },
  { icon: "graduation", title: "Training Courses", text: "P1–P4 certification programs available." },
  { icon: "tent", title: "Adventure Combos", text: "Paragliding + stays, camping & trekking." },
];

export function AboutSection() {
  const { settings } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div ref={ref} className="relative h-[34rem] sm:h-[40rem]">
          <motion.div style={{ y: y1 }} className="absolute left-0 top-0 h-[75%] w-[62%] overflow-hidden rounded-[2rem] shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media("/uploads/media/compressed_g17.jpg")} alt="Paraglider over Bir Billing" className="size-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 h-[70%] w-[55%] overflow-hidden rounded-[2rem] border-8 border-cream shadow-2xl">
            <LazyVideo src="/uploads/media/v7_compressed.mp4" className="size-full object-cover" />
          </motion.div>
          <motion.div
            style={{ rotate }}
            className="absolute left-[44%] top-[58%] z-10 grid size-32 -translate-x-1/2 place-items-center rounded-full bg-sunset text-center text-white shadow-2xl shadow-sunset/40 sm:size-36"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
              <defs>
                <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-white text-[9.5px] font-bold uppercase tracking-[0.25em]">
                <textPath href="#circle">Since {settings.about.since} · Bir Billing · Since {settings.about.since} ·</textPath>
              </text>
            </svg>
            <Icon name="parachute" className="size-10" />
          </motion.div>
        </div>

        <div>
          <Reveal y={16}>
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" /> We Are {settings.brand}
            </span>
          </Reveal>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-6xl">
            <SplitText text="Your gateway to the skies of" />{" "}
            <SplitText text="India's paragliding capital" delay={0.2} wordClassName="text-gradient italic font-black" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{settings.about.text}</p>
          </Reveal>

          <div className="mt-8 space-y-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={0.1 * i} y={20}>
                <div className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-cream text-sunset transition group-hover:bg-sunset group-hover:text-white">
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold">{s.title}</p>
                    <p className="text-sm text-muted">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 divide-x divide-ink/10 rounded-2xl border border-ink/10 bg-white/50">
            {settings.about.counters.map((c) => (
              <div key={c.label} className="p-4 text-center sm:p-6">
                <Counter to={c.value} suffix={c.suffix} className="font-display text-3xl font-extrabold text-ink sm:text-4xl" />
                <p className="mt-1 text-xs text-muted sm:text-sm">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/packages/" size="lg" icon="arrow-up-right">
              Book a Flight
            </Button>
            <Button href={telLink(settings.phoneSecondary)} variant="outline" size="lg" iconLeft="phone">
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
