"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePackages, useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Effects";
import { Icon } from "@/components/ui/Icon";
import { Marquee } from "@/components/ui/Marquee";
import { SplitText } from "@/components/ui/Motion";
import { inr, media, telLink, waLink } from "@/lib/utils";
import { Logo } from "./Logo";
import { legalLinks, nav } from "./nav";

const strip = ["compressed_g11.jpeg", "compressed_g3.jpeg", "compressed_g13.jpeg", "compressed_g25.jpeg", "compressed_g6.jpg", "compressed_g10.jpeg"];

export function Footer() {
  const { settings } = useSite();
  const courses = usePackages("course");
  const tandems = usePackages("tandem");
  const links = nav.filter((n) => !n.children);

  return (
    <footer className="grain relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -left-40 top-40 size-[30rem] rounded-full bg-sunset/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-[30rem] rounded-full bg-navy-2/60 blur-[120px]" />

      {/* Big CTA */}
      <div className="container-x relative pt-20 sm:pt-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">
              <span className="h-px w-6 bg-current" /> Your sky story starts here
            </p>
            <h2 className="mt-4 text-5xl font-black leading-[0.95] sm:text-7xl lg:text-8xl">
              <SplitText text="Ready to" />{" "}
              <SplitText text="fly?" delay={0.15} wordClassName="text-gradient italic pr-3" />
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Magnetic className="block">
              <Button href="/book/" size="lg" icon="arrow-up-right" className="w-full">
                Book Your Flight
              </Button>
            </Magnetic>
            <Button href={waLink(settings.whatsapp, "Hi, I want to book paragliding")} variant="whatsapp" size="lg" iconLeft="whatsapp">
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Photo strip */}
        <div className="no-scrollbar mt-12 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-6 sm:overflow-visible">
          {strip.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -8, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 160, damping: 18 }}
              className="aspect-[3/4] w-32 shrink-0 overflow-hidden rounded-2xl sm:w-auto"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media("/uploads/media/" + f)} alt="Happy flyer at Bir Billing" loading="lazy" className="size-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 border-y border-white/10 py-5">
        <Marquee duration={35}>
          {["Tandem Flights", "P1–P4 Courses", "World's 2nd Best Site", "Bir Billing", "2400m Take-off", "Certified Pilots", "GoPro Videos"].map((t) => (
            <span key={t} className="flex items-center gap-6 px-3 font-display text-3xl font-extrabold tracking-tight text-white/90 sm:gap-8 sm:px-4 sm:text-5xl">
              {t}
              <Icon name="parachute" className="size-7 text-sunset sm:size-9" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-x relative py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{settings.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Certified", "Insured", "10K+ Flyers"].map((b) => (
                <span key={b} className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70">
                  <Icon name="check" className="size-3.5 text-sunset" />
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-2.5">
              {settings.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid size-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-sunset hover:ring-sunset"
                >
                  <Icon name={s.name} className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Packages: side by side even on phones */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:col-span-2 lg:col-span-5">
            {[
              { title: "Training Courses", list: courses },
              { title: "Tandem Flights", list: tandems },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-sunset">{col.title}</h3>
                <ul className="mt-5 space-y-4">
                  {col.list.map((p) => (
                    <li key={p.id}>
                      <Link href={`/packages/${p.slug}/`} className="group block">
                        <span className="block text-sm font-medium capitalize leading-snug text-white/90 transition group-hover:text-sunset">{p.title}</span>
                        <span className="text-xs text-white/45">
                          {inr(p.price)} · {p.duration}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="md:col-span-2 lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sunset">Get In Touch</h3>
            <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
              {[
                { icon: "phone", href: telLink(settings.phonePrimary), value: settings.phonePrimary, sub: "24/7 Support · WhatsApp" },
                { icon: "phone", href: telLink(settings.phoneSecondary), value: settings.phoneSecondary, sub: "Bookings & Management" },
                { icon: "mail", href: "mailto:" + settings.email, value: settings.email, sub: "Quick response" },
                { icon: "map-pin", href: settings.mapUrl, value: "Bir Billing, Himachal Pradesh", sub: settings.hours },
              ].map((c) => (
                <li key={c.value}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/5 transition hover:bg-white/[0.08]"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sunset/15 text-sunset">
                      <Icon name={c.icon} className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block break-words font-medium text-white/90">{c.value}</span>
                      <span className="block text-xs text-white/45">{c.sub}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-2 lg:items-center">
          <ul className="flex flex-wrap gap-2">
            {links.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-white/70 transition hover:border-sunset hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50 lg:justify-end">
            {legalLinks.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 pb-24 text-center text-xs text-white/40 lg:pb-0 lg:text-left">
          © {new Date().getFullYear()} {settings.brand}. Made with ♥ in the Himalayas · Your trusted partner for safe paragliding adventures.
        </p>
      </div>
    </footer>
  );
}
