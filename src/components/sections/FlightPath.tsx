"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const PATH = "M150 150 C 330 110, 420 260, 560 230 S 760 120, 880 260 S 1080 420, 1250 470";

const stops = [
  { at: 0, title: "Take-off · Billing", value: "2400m", text: "Run a few steps off the grassy launch above the Dhauladhars.", icon: "mountain" },
  { at: 0.35, title: "Ride the thermals", value: "+300m", text: "Your pilot circles rising air for altitude and jaw-dropping views.", icon: "wind" },
  { at: 0.7, title: "Glide over the valley", value: "14 km", text: "Tea gardens, monasteries and Bir village spread out below you.", icon: "sun" },
  { at: 0.95, title: "Landing · Bir", value: "1400m", text: "A soft touchdown at the Chaugan landing site — video in hand.", icon: "parachute" },
];

/** Pinned section where scrolling draws the flight route and flies a glider along it. */
export function FlightPath() {
  const section = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(1);
  const [pos, setPos] = useState({ x: 150, y: 150, angle: 0 });
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const dash = useTransform(progress, (p) => len * (1 - p));
  const altitude = useTransform(progress, [0, 0.35, 1], [2400, 2700, 1400]);
  const [alt, setAlt] = useState(2400);

  // On portrait phones show the whole route instead of cropping its ends.
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    if (path.current) setLen(path.current.getTotalLength());
    const mq = window.matchMedia("(max-aspect-ratio: 1/1)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useMotionValueEvent(progress, "change", (p) => {
    const el = path.current;
    if (!el) return;
    const d = Math.min(len, Math.max(0, p * len));
    const a = el.getPointAtLength(d);
    const b = el.getPointAtLength(Math.min(len, d + 2));
    setPos({ x: a.x, y: a.y, angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI });
    setActive(stops.reduce((acc, s, i) => (p >= s.at - 0.02 ? i : acc), 0));
  });
  useMotionValueEvent(altitude, "change", (v) => setAlt(Math.round(v / 10) * 10));

  return (
    <section ref={section} className="relative h-[320vh] bg-ink text-white">
      <div className="grain sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Sky gradient + sun */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1533] via-navy to-[#3a2a4a]" />
        <div className="absolute right-[8%] top-[34%] size-24 rounded-full bg-gradient-to-b from-amber-300 to-sunset opacity-70 blur-[2px] sm:right-[12%] sm:top-[18%] sm:size-56" />
        <div className="absolute right-[8%] top-[34%] size-24 rounded-full bg-sunset/40 blur-3xl sm:right-[12%] sm:top-[18%] sm:size-56" />

        <div className="container-x relative z-10 pt-24 sm:pt-28">
          <p className="eyebrow">
            <span className="h-px w-6 bg-current" /> Your flight, step by step
          </p>
          <h2 className="mt-3 max-w-2xl text-4xl font-black leading-[1] sm:text-6xl">
            From Billing <span className="text-gradient italic">to Bir</span>
          </h2>
        </div>

        <div className="relative flex-1">
          <svg
            viewBox="0 0 1400 620"
            preserveAspectRatio={narrow ? "xMidYMid meet" : "xMidYMid slice"}
            className="absolute inset-0 size-full"
            aria-hidden="true"
          >
            {/* Mountain layers */}
            <path d="M0 620 L0 260 L120 150 L210 210 L330 120 L470 250 L620 190 L760 300 L900 260 L1050 360 L1200 330 L1400 400 L1400 620Z" fill="#232f63" opacity=".55" />
            <path d="M0 620 L0 330 L160 230 L260 300 L420 260 L560 360 L720 320 L880 410 L1040 400 L1220 470 L1400 450 L1400 620Z" fill="#18214a" opacity=".85" />
            <path d="M0 620 L0 430 L200 380 L420 440 L640 420 L860 480 L1100 500 L1400 520 L1400 620Z" fill="#0a0f24" />
            {/* Snow caps */}
            <path d="M120 150 L150 178 L135 175 L112 160Z M330 120 L365 152 L340 148 L318 132Z" fill="#fff" opacity=".7" />

            {/* Route */}
            <path d={PATH} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" strokeDasharray="6 10" />
            <motion.path ref={path} d={PATH} fill="none" stroke="url(#route)" strokeWidth="4" strokeLinecap="round" strokeDasharray={len} style={{ strokeDashoffset: dash }} />
            <defs>
              <linearGradient id="route" x1="0" x2="1">
                <stop offset="0" stopColor="#ffd27a" />
                <stop offset="1" stopColor="#f2762e" />
              </linearGradient>
            </defs>

            {/* Markers */}
            <circle cx="150" cy="150" r="10" fill="#f2762e" />
            <circle cx="150" cy="150" r="22" fill="none" stroke="#f2762e" strokeOpacity=".4" strokeWidth="2" />
            <circle cx="1250" cy="470" r="10" fill="#fff" />
            <circle cx="1250" cy="470" r="22" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="2" />

            {/* Glider */}
            <g transform={`translate(${pos.x} ${pos.y}) rotate(${pos.angle * 0.35})`}>
              <g transform="translate(-30 -52)">
                <path d="M2 18C16 2 44 2 58 18c-6-4-12-5-20-6-4 0-12 0-16 0-8 1-14 2-20 6z" fill="#f2762e" />
                <path d="M4 18 30 44M20 12l10 32M40 12 30 44M56 18 30 44" stroke="#fff" strokeWidth=".8" opacity=".8" />
                <circle cx="30" cy="46" r="4" fill="#fff" />
              </g>
            </g>
          </svg>

          {/* Live altimeter */}
          <div className="glass absolute bottom-4 right-4 rounded-2xl px-4 py-3 sm:right-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Altitude</p>
            <p className="font-display text-2xl font-black tabular-nums sm:text-3xl">{alt}m</p>
          </div>
        </div>

        {/* Step cards */}
        <div className="container-x relative z-10 pb-24 lg:pb-10">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {stops.map((s, i) => (
              <motion.div
                key={s.title}
                animate={{ opacity: i <= active ? 1 : 0.35, y: i === active ? -6 : 0, scale: i === active ? 1.02 : 1 }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl border p-3 backdrop-blur-md sm:p-4 ${i === active ? "border-sunset/60 bg-white/10" : "border-white/10 bg-white/[0.04]"}`}
              >
                <div className="flex items-center justify-between">
                  <Icon name={s.icon} className="size-5 text-sunset" />
                  <span className="font-display text-lg font-black sm:text-xl">{s.value}</span>
                </div>
                <p className="mt-2 text-sm font-bold sm:text-base">{s.title}</p>
                <p className="mt-1 hidden text-xs leading-relaxed text-white/60 sm:block">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
