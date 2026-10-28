"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { SplitText } from "@/components/ui/Motion";
import { cn, media } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/** Stack of tilted photos that fan out on load and drift apart on scroll. */
function PhotoStack({ photos }: { photos: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y0 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const ys = [y0, y1, y2];
  const layout = [
    { cls: "left-[8%] top-[4%] w-[58%] aspect-[4/5] z-10", rotate: -7 },
    { cls: "right-0 top-[22%] w-[48%] aspect-[3/4] z-20", rotate: 6 },
    { cls: "left-[22%] bottom-0 w-[46%] aspect-square z-30", rotate: -2 },
  ];

  return (
    <div ref={ref} className="relative hidden h-[34rem] lg:block">
      {photos.slice(0, 3).map((src, i) => (
        <motion.div key={src} style={{ y: ys[i] }} className={cn("absolute hover:z-40", layout[i].cls)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 0, y: 80 }}
            animate={{ opacity: 1, scale: 1, rotate: layout[i].rotate, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1.1, ease }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="size-full overflow-hidden rounded-[1.75rem] border-[6px] border-white/90 shadow-2xl shadow-black/50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media(src)} alt="" className="size-full object-cover" />
          </motion.div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 15 }}
        className="glass absolute -left-4 bottom-16 z-40 flex animate-float items-center gap-3 rounded-2xl px-4 py-3"
      >
        <span className="grid size-10 place-items-center rounded-full bg-sunset">
          <Icon name="star" className="size-5" />
        </span>
        <span>
          <span className="block font-display text-lg font-bold leading-none">4.9 / 5</span>
          <span className="text-xs text-white/70">10,000+ happy flyers</span>
        </span>
      </motion.div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  video,
  image,
  photos,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  video?: string;
  image?: string;
  photos?: string[];
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="grain relative flex min-h-[78svh] items-end overflow-hidden bg-ink text-white lg:min-h-[100svh] lg:items-center">
      {(video || image) && (
        <motion.div style={{ scale }} className="absolute inset-0">
          {video ? (
            <video className="size-full object-cover" src={media(video)} autoPlay muted loop playsInline preload="auto" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media(image!)} alt="" className="size-full object-cover" />
          )}
        </motion.div>
      )}
      {/* Darken only where the text sits so the visual stays visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/45 lg:to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div style={{ y, opacity }} className="container-x relative grid w-full items-center gap-10 pb-16 pt-36 sm:pb-20 lg:grid-cols-[1.15fr_1fr] lg:pt-32">
        <div>
          <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/60">
            <Link href="/" className="hover:text-white">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <Icon name="chevron-right" className="size-3" />
                {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
              </span>
            ))}
          </motion.nav>

          {eyebrow && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="eyebrow mt-6">
              <span className="h-px w-6 bg-current" /> {eyebrow}
            </motion.p>
          )}
          <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl xl:text-8xl">
            <SplitText text={title} delay={0.4} />
            {highlight && (
              <>
                {" "}
                <SplitText text={highlight} delay={0.6} wordClassName="text-gradient italic pr-2" />
              </>
            )}
          </h1>
          {subtitle && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-8">
              {children}
            </motion.div>
          )}
          {photos && (
            <div className="mt-8 flex -space-x-4 lg:hidden">
              {photos.slice(0, 3).map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 30, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: [-6, 4, -3][i] }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.8, ease }}
                  className="size-24 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:size-28"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={media(src)} alt="" className="size-full object-cover" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
        {photos && <PhotoStack photos={photos} />}
      </motion.div>
    </section>
  );
}
