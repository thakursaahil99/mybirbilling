"use client";

import { motion } from "motion/react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { useSite } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";
import { telLink, waLink } from "@/lib/utils";

export function ContactBody() {
  const { settings } = useSite();
  const channels = [
    { icon: "phone", label: "Call / Booking", value: settings.phonePrimary, href: telLink(settings.phonePrimary), tone: "bg-sunset" },
    { icon: "whatsapp", label: "WhatsApp", value: "Chat instantly", href: waLink(settings.whatsapp, "Hi, I want to book paragliding"), tone: "bg-[#25D366]" },
    { icon: "mail", label: "Email", value: settings.email, href: "mailto:" + settings.email, tone: "bg-navy" },
    { icon: "phone", label: "Management", value: settings.phoneSecondary, href: telLink(settings.phoneSecondary), tone: "bg-ink" },
  ];

  return (
    <section className="relative z-10 -mt-16 pb-16">
      <div className="container-x">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group flex items-center gap-4 rounded-3xl bg-white p-5 shadow-xl shadow-ink/5 ring-1 ring-ink/5"
            >
              <span className={`grid size-12 shrink-0 place-items-center rounded-2xl text-white ${c.tone}`}>
                <Icon name={c.icon} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-widest text-muted">{c.label}</span>
                <span className="block truncate font-semibold">{c.value}</span>
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="card p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Send a message</h2>
              <p className="mt-2 text-muted">We usually reply within a few minutes during working hours.</p>
              <div className="mt-8">
                <EnquiryForm source="contact" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-ink text-white">
              <div className="space-y-6 p-6 sm:p-10">
                <h2 className="text-3xl font-extrabold">Visit us</h2>
                <div className="flex gap-4">
                  <Icon name="map-pin" className="mt-1 size-5 shrink-0 text-sunset" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Office location</p>
                    <p className="mt-1">{settings.address}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Icon name="clock" className="mt-1 size-5 shrink-0 text-sunset" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Working hours</p>
                    <p className="mt-1">{settings.hours}</p>
                  </div>
                </div>
                <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-sunset hover:underline">
                  Open in Google Maps <Icon name="arrow-up-right" className="size-4" />
                </a>
              </div>
              <iframe
                title="MyBirBilling location"
                src="https://maps.google.com/maps?q=Bir%20Billing%20Himachal%20Pradesh&z=13&output=embed"
                className="min-h-72 w-full flex-1 grayscale-[40%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
