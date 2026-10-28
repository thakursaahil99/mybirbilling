"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Tilt } from "@/components/ui/Effects";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { inr, media } from "@/lib/utils";

export function StaysSection() {
  const { stays, extras, settings } = useSite();
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Stay With Us"
          title="Our top stays &"
          highlight="local services"
          subtitle="Choose your perfect accommodation and grab the best local deals — all arranged by our team."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stays.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/stay/?stay=${s.slug}#plan`} data-cursor="View" className="block">
                <Tilt className="relative h-96 overflow-hidden rounded-[2rem] bg-ink text-white shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={media(s.image)} alt={s.title} loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 group-hover/tilt:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  {s.popular && <span className="absolute left-5 top-5 rounded-full bg-sunset px-3 py-1 text-[11px] font-bold uppercase tracking-widest">Most booked</span>}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs uppercase tracking-widest text-white/60">{s.tagline}</p>
                    <p className="font-display text-2xl font-extrabold">{s.title}</p>
                    <p className="mt-2 flex items-baseline gap-1.5">
                      <span className="font-display text-3xl font-extrabold text-sunset-2">{inr(s.price)}</span>
                      <span className="text-xs text-white/70">per {s.pricing === "person" ? "person" : "room"} / night</span>
                    </p>
                  </div>
                </Tilt>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-wrap items-center gap-3 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-ink/5">
            <p className="w-full text-xs font-bold uppercase tracking-widest text-muted">Additional services</p>
            {extras.map((e) => (
              <span key={e.id} className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold">
                <Icon name={e.icon} className="size-4 text-sunset" />
                {e.title} <span className="text-sunset">{inr(e.price)} / {e.unit}</span>
              </span>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex flex-col gap-5 overflow-hidden rounded-[2rem] bg-gradient-to-r from-sunset to-ember p-6 text-white sm:flex-row sm:items-center"
          >
            <span className="absolute -right-6 -top-6 size-32 rounded-full bg-white/10" />
            <span className="font-display text-5xl font-black sm:text-6xl">{settings.comboDiscount}%</span>
            <div className="flex-1">
              <p className="flex items-center gap-2 font-display text-xl font-bold">
                <Icon name="sparkles" className="size-5" /> Build your own package
              </p>
              <p className="text-sm text-white/85">Combine flight + stay + meals + scooty and get {settings.comboDiscount}% OFF the whole trip.</p>
            </div>
            <Button href="/stay/#plan" variant="dark" icon="arrow-up-right" className="relative">
              Build My Trip
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
