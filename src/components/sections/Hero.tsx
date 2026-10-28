"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Effects";
import { Icon } from "@/components/ui/Icon";
import { media } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { settings } = useSite();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [line1, line2] = settings.hero.title;

  return (
    <section ref={ref} className="grain relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-white">
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <video
          className="size-full object-cover"
          src={media(settings.heroVideo)}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={media("/uploads/media/compressed_g17.jpg")}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative flex h-full flex-col justify-end pb-32 sm:pb-36 lg:pb-28">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease }}
          className="glass mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-sunset opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-sunset" />
          </span>
          {settings.hero.eyebrow}
        </motion.span>

        <h1 className="font-display font-black uppercase leading-[0.85] tracking-[-0.04em]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[22vw] sm:text-[17vw] lg:text-[11.5rem]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 1.7, duration: 1.1, ease }}
            >
              {line1}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="text-gradient block pr-4 text-[22vw] italic sm:text-[17vw] lg:text-[11.5rem]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 1.85, duration: 1.1, ease }}
            >
              {line2}
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.9, ease }}
          >
            <p className="max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">{settings.hero.subtitle}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {settings.hero.badges.map((b) => (
                <li key={b} className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium sm:text-sm">
                  <Icon name="check" className="size-3.5 text-sunset" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.25, duration: 0.9, ease }}
          >
            <Magnetic>
              <Button href="/book/" size="lg" icon="arrow-up-right">
                Book Your Adventure
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/packages/" size="lg" variant="ghost-light" icon="arrow-right">
                Explore Packages
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating stat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.8, ease }}
        className="glass absolute right-8 top-36 hidden animate-float rounded-3xl p-5 xl:block"
      >
        <p className="text-xs uppercase tracking-widest text-white/60">Take-off altitude</p>
        <p className="font-display text-4xl font-extrabold">
          2400<span className="text-sunset">m</span>
        </p>
        <p className="mt-1 flex items-center gap-1 text-xs text-white/70">
          <Icon name="star" className="size-3.5 text-amber-400" /> World&apos;s 2nd best site
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/60 lg:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-sunset"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
