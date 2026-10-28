"use client";

import { motion } from "motion/react";
import { useSite } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { waLink } from "@/lib/utils";

const brand: Record<string, string> = {
  instagram: "from-[#f58529] via-[#dd2a7b] to-[#8134af]",
  youtube: "from-[#ff0000] to-[#b30000]",
  facebook: "from-[#1877f2] to-[#0b4fb3]",
  whatsapp: "from-[#25D366] to-[#128C7E]",
};

const benefits = [
  { icon: "shield", title: "Verified & Authentic", text: "Trustworthy content directly from our team." },
  { icon: "sparkles", title: "Exclusive Offers", text: "Early access to discounts and special packages." },
  { icon: "check", title: "Scam Protection", text: "Avoid fake pages and fraudulent offers." },
];

export function CommunitySection() {
  const { settings } = useSite();
  const cards = [
    ...settings.socials.map((s) => ({ key: s.name, label: s.name, value: s.followers, url: s.url, sub: "Followers" })),
    { key: "whatsapp", label: "WhatsApp", value: "Chat", url: waLink(settings.whatsapp), sub: "Instant replies" },
  ];

  return (
    <section className="relative overflow-hidden bg-sand/60 py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="MyBirBilling Community"
            title="Our digital"
            highlight="footprint"
            subtitle="Daily flight videos, stunning photos from Bir Billing and tips for aspiring pilots. Following our verified accounts is the best way to protect yourself from scams and fake pages."
          />
          <div className="mt-10 space-y-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1} y={20}>
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-white">
                    <Icon name={b.icon} className="size-5" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold">{b.title}</p>
                    <p className="text-sm text-muted">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <div key={c.key} className={i % 2 ? "translate-y-8" : ""}>
            <motion.a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -8, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.08 }}
              className={`relative flex aspect-square flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br ${brand[c.key]} p-5 text-white shadow-2xl sm:p-6`}
            >
              <Icon name={c.key} className="size-10" />
              <Icon name="arrow-up-right" className="absolute right-6 top-6 size-6 opacity-70" />
              <div>
                <p className="font-display text-4xl font-extrabold sm:text-5xl">{c.value}</p>
                <p className="mt-1 text-sm capitalize text-white/80">
                  {c.label} · {c.sub}
                </p>
              </div>
            </motion.a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
