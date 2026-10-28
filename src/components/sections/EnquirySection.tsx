"use client";

import { motion } from "motion/react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { useSite } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EnquirySection({ source = "home" }: { source?: string }) {
  const { partners, settings } = useSite();
  return (
    <section className="relative overflow-hidden bg-sand/60 py-24 sm:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Get a Custom Quote"
            title="Have questions or"
            highlight="ready to book?"
            subtitle="Fill out the form for a custom quote — or check out our partner stays for special rates."
          />
          <Reveal delay={0.2} className="mt-10">
            <div className="card p-6 sm:p-8">
              <EnquiryForm source={source} />
            </div>
          </Reveal>
        </div>

        <div className="lg:pt-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-sunset/30 blur-3xl" />
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sunset">
                <Icon name="sparkles" className="size-4" /> Special offer
              </p>
              <p className="mt-2 font-display text-2xl font-bold">{settings.stayOffer}</p>

              <h3 className="mt-8 font-display text-xl font-bold">Our partner stays</h3>
              <p className="mt-1 text-sm text-white/60">Hand-picked local stays. Book with us for special rates.</p>
              <ul className="mt-6 divide-y divide-white/10">
                {partners.map((p, i) => (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.6 }}
                    className="group flex items-center justify-between py-3.5"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-full bg-white/10 font-display text-sm font-bold text-sunset transition group-hover:bg-sunset group-hover:text-white">
                        {p.name.charAt(0)}
                      </span>
                      <span className="font-medium">{p.name}</span>
                    </span>
                    <span className="text-xs text-white/50">{p.tagline}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
