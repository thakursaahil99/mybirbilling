"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const principles = [
  { icon: "shield", title: "Uncompromising Safety", text: "Your safety is our absolute priority. We use internationally certified equipment and adhere to the strictest safety protocols." },
  { icon: "users", title: "Expert Pilot Team", text: "Fly with confidence. Our team is highly experienced, certified and friendly — and passionate about flying." },
];

const difference = [
  { icon: "wind", title: "Optimal Flying Conditions", text: "Bir Billing's unique geography provides reliable thermals and weather, making it a world-renowned flying paradise." },
  { icon: "mountain", title: "Breathtaking Scenery", text: "Soar over the lush Dhauladhar range and witness unparalleled, panoramic views of the Himalayas." },
  { icon: "award", title: "Professional Operations", text: "From booking to landing, a seamless and professional service dedicated to your comfort and enjoyment." },
];

export function AboutValues() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <>
      <section className="py-24 sm:py-32">
        <div ref={ref} className="container-x">
          <p className="eyebrow">
            <span className="h-px w-6 bg-current" /> More than a flight
          </p>
          <motion.p style={{ opacity }} className="mt-6 max-w-5xl font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
            Paragliding isn&apos;t just an activity — it&apos;s the feeling of pure freedom as you soar above the Himalayan foothills, the quiet
            thrill of gliding with the wind, and <span className="text-gradient italic">memories that last a lifetime.</span>
          </motion.p>
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="flex h-full gap-5 rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-ink/5">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink text-sunset">
                    <Icon name={p.icon} className="size-7" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-ink py-24 text-white sm:py-32">
        <div className="container-x relative">
          <SectionHeading dark eyebrow="The MyBirBilling Difference" title="What makes us" highlight="exceptional" />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-3">
            {difference.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.12}>
                <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-navy sm:p-10">
                  <span className="font-display text-6xl font-black text-white/10 transition group-hover:text-sunset/40">0{i + 1}</span>
                  <Icon name={d.icon} className="mt-4 size-10 text-sunset transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
                  <h3 className="mt-6 text-2xl font-bold">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/60">{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
