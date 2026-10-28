"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePackages, useSite } from "@/components/providers/SiteProvider";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { PilotsSection } from "@/components/sections/PilotsSection";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Magnetic, Tilt } from "@/components/ui/Effects";
import { Icon } from "@/components/ui/Icon";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { Reveal, SplitText, Stagger, StaggerItem } from "@/components/ui/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Package } from "@/lib/types";
import { cn, inr, media, waLink } from "@/lib/utils";

const groupIcons = ["shield", "parachute", "award", "users", "sparkles", "check"];

export function PackageDetail({ slug }: { slug: string }) {
  const { packages } = useSite();
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) {
    return (
      <div className="container-x py-48 text-center">
        <h1 className="text-4xl font-bold">Package not found</h1>
        <Button href="/packages/" className="mt-8">See all packages</Button>
      </div>
    );
  }
  return (
    <>
      <DetailHero pkg={pkg} />
      <Intro pkg={pkg} />
      <Details pkg={pkg} />
      <PriceCta pkg={pkg} />
      {pkg.faqs.length > 0 && <Faqs pkg={pkg} />}
      <PilotsSection limit={4} />
      <EnquirySection source={`package:${pkg.slug}`} />
      <ExploreMore current={pkg} />
    </>
  );
}

function DetailHero({ pkg }: { pkg: Package }) {
  const { settings } = useSite();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="grain relative min-h-[100svh] overflow-hidden bg-ink text-white">
      <motion.div style={{ scale }} className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.video
            key={active}
            src={media(pkg.heroVideos[active])}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 size-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />

      <motion.div style={{ y }} className="container-x relative grid min-h-[100svh] items-end gap-10 pb-28 pt-36 lg:grid-cols-[1.3fr_1fr] lg:pb-20">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icon name="chevron-right" className="size-3" />
            <Link href="/packages/" className="hover:text-white">Packages</Link>
            <Icon name="chevron-right" className="size-3" />
            <span className="text-white">{pkg.title}</span>
          </nav>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="eyebrow mt-6">
            <span className="h-px w-6 bg-current" /> {pkg.tagline}
          </motion.p>
          <h1 className="mt-4 text-5xl font-black leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
            <SplitText text={pkg.heroTitle[0]} delay={0.4} />
            <br />
            <SplitText text={pkg.heroTitle[1]} delay={0.6} wordClassName="text-gradient italic pr-2" />
          </h1>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 flex flex-wrap gap-2">
            {pkg.heroBadges.map((b) => (
              <li key={b} className="glass flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm">
                <Icon name="check" className="size-4 text-sunset" /> {b}
              </li>
            ))}
          </motion.ul>

          {/* Video switcher */}
          <div className="mt-8 flex gap-2">
            {pkg.heroVideos.map((v, i) => (
              <button
                key={v + i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show video ${i + 1}`}
                className={cn(
                  "relative h-14 w-20 overflow-hidden rounded-xl ring-2 transition sm:h-16 sm:w-24",
                  i === active ? "ring-sunset" : "opacity-60 ring-transparent hover:opacity-100",
                )}
              >
                <LazyVideo src={v} className="size-full object-cover" />
                {i === active && <motion.span layoutId="vid-active" className="absolute inset-0 bg-sunset/20" />}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-[2rem] p-6 sm:p-8 lg:justify-self-end"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-white/60">{pkg.category === "course" ? "Course Fee" : "Starting From"}</p>
          <p className="mt-2 font-display text-6xl font-black">{inr(pkg.price)}</p>
          <p className="text-sm text-white/60">{pkg.priceUnit}</p>
          <div className="my-6 h-px bg-white/15" />
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2"><Icon name="clock" className="size-4 text-sunset" /> {pkg.duration}</li>
            <li className="flex items-center gap-2"><Icon name="map-pin" className="size-4 text-sunset" /> Bir Billing, Himachal Pradesh</li>
            <li className="flex items-center gap-2"><Icon name="shield" className="size-4 text-sunset" /> Certified pilots & equipment</li>
          </ul>
          <div className="mt-6 grid gap-3">
            <Magnetic className="block">
              <Button href={`/book/?package=${pkg.slug}`} size="lg" icon="arrow-up-right" className="w-full">
                Pay {inr(pkg.advance)} to Book
              </Button>
            </Magnetic>
            <Button href={waLink(settings.whatsapp, pkg.whatsappText)} variant="whatsapp" size="lg" iconLeft="whatsapp" className="w-full">
              WhatsApp Enquiry
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Intro({ pkg }: { pkg: Package }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading title={pkg.intro.title} highlight={pkg.intro.highlight} subtitle={pkg.intro.subtitle} />
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div ref={ref} className="relative h-[28rem] overflow-hidden rounded-[2rem] sm:h-[34rem]">
            <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media(pkg.image)} alt={pkg.title} className="size-full object-cover" loading="lazy" />
            </motion.div>
            <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 text-ink backdrop-blur-md">
              <p className="text-xs uppercase tracking-widest text-muted">Duration</p>
              <p className="font-display text-xl font-bold">{pkg.duration}</p>
            </div>
          </div>
          <div>
            <Reveal>
              <h3 className="text-3xl font-extrabold sm:text-4xl">{pkg.intro.heading}</h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-muted">{pkg.intro.text}</p>
            </Reveal>
            <Stagger className="mt-8 space-y-3">
              {pkg.intro.features.map((f) => (
                <StaggerItem key={f.label}>
                  <div className="group flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5 transition hover:translate-x-2 hover:ring-sunset/40">
                    <span className="flex items-center gap-3 font-semibold">
                      <span className="grid size-9 place-items-center rounded-full bg-sunset/10 text-sunset transition group-hover:bg-sunset group-hover:text-white">
                        <Icon name="check" className="size-4" />
                      </span>
                      {f.label}
                    </span>
                    <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">{f.tag}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.3} className="mt-8">
              <Button href={`/book/?package=${pkg.slug}`} size="lg" icon="arrow-up-right">
                Book {pkg.category === "course" ? "Course" : "Flight"} Now
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Details({ pkg }: { pkg: Package }) {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute right-0 top-0 size-[40rem] rounded-full bg-sunset/10 blur-[140px]" />
      <div className="container-x relative">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="rounded-full bg-sunset px-5 py-2 font-display text-sm font-bold uppercase tracking-widest"
          >
            {pkg.details.badge}
          </motion.span>
          <SectionHeading dark title={pkg.details.title} subtitle={pkg.details.subtitle} className="mt-2" />
        </div>

        <h3 className="mt-16 text-center font-display text-2xl font-bold text-white/90">{pkg.details.heading}</h3>
        <div className="mt-8 columns-1 gap-5 md:columns-2 lg:columns-3">
          {pkg.details.groups.map((g, gi) => (
            <Reveal key={g.title} delay={(gi % 3) * 0.1} className="mb-5 break-inside-avoid">
              <Tilt max={6} className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-sunset/15 text-sunset">
                    <Icon name={groupIcons[gi % groupIcons.length]} className="size-5" />
                  </span>
                  <h4 className="text-xl font-bold">{g.title}</h4>
                </div>
                <ul className="mt-5 space-y-4">
                  {g.items.map((it) => (
                    <li key={it.title} className="flex gap-3">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-sunset" />
                      <span>
                        <span className="block font-semibold">{it.title}</span>
                        {it.text && <span className="mt-0.5 block text-sm leading-relaxed text-white/60">{it.text}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PriceCta({ pkg }: { pkg: Package }) {
  const { settings } = useSite();
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-sunset via-ember to-[#b8401a] p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border-[30px] border-white/10" />
            <h2 className="max-w-md text-4xl font-black leading-tight sm:text-5xl">{pkg.cta.title}</h2>
            <p className="mt-4 max-w-md text-white/85">{pkg.cta.subtitle}</p>
            <div className="mt-8 rounded-2xl bg-white/15 p-5 backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">{pkg.category === "course" ? "Course Investment" : "Flight Price"}</p>
              <p className="font-display text-5xl font-black">{inr(pkg.price)}</p>
              <ul className="mt-4 space-y-2">
                {pkg.cta.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <Icon name="check" className="size-4" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/book/?package=${pkg.slug}`} variant="dark" size="lg" icon="arrow-up-right">
                Pay {inr(pkg.advance)} Advance
              </Button>
              <Button href={waLink(settings.whatsapp, pkg.whatsappText)} variant="light" size="lg" iconLeft="whatsapp">
                WhatsApp
              </Button>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {pkg.cta.perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 18 }}
              whileHover={{ y: -6 }}
              className="flex flex-col justify-between rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-ink/5"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-cream text-sunset">
                <Icon name={["star", "clock", "shield", "award"][i % 4]} className="size-6" />
              </span>
              <div className="mt-8">
                <p className="font-display text-xl font-bold leading-tight">{p.title}</p>
                <p className="mt-1 text-sm text-muted">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faqs({ pkg }: { pkg: Package }) {
  const { settings } = useSite();
  return (
    <section className="bg-sand/60 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading align="left" eyebrow="FAQ" title="Frequently asked" highlight="questions" subtitle={`Everything you need to know about the ${pkg.title}.`} />
          <Reveal delay={0.2} className="mt-8">
            <Button href={waLink(settings.whatsapp, `Hi, I have a question about ${pkg.title}`)} variant="whatsapp" iconLeft="whatsapp">
              Ask on WhatsApp
            </Button>
          </Reveal>
        </div>
        <Accordion items={pkg.faqs} />
      </div>
    </section>
  );
}

function ExploreMore({ current }: { current: Package }) {
  const others = usePackages().filter((p) => p.id !== current.id).slice(0, 3);
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Keep Exploring" title="Explore more" highlight="adventures" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <Link href={`/packages/${p.slug}/`} data-cursor="Explore" className="group relative block h-80 overflow-hidden rounded-[2rem] bg-ink text-white">
                <LazyVideo src={p.cardVideo} className="absolute inset-0 size-full object-cover opacity-80 transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-sunset-2">{p.level}</p>
                    <p className="mt-1 font-display text-2xl font-bold">{p.title}</p>
                    <p className="text-sm text-white/70">{inr(p.price)} · {p.duration}</p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-ink transition group-hover:rotate-45 group-hover:bg-sunset group-hover:text-white">
                    <Icon name="arrow-up-right" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
