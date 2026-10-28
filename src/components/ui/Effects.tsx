"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Thin sunset bar at the top showing page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-sunset to-amber-300" />;
}

/** Custom cursor: a dot plus a trailing ring that grows over links/buttons. Desktop pointers only. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      setHovering(!!el);
      setLabel(el?.dataset.cursor ?? "");
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  useEffect(() => {
    setHovering(false);
    setLabel("");
  }, [pathname]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-1 -mt-1 size-2 rounded-full bg-sunset mix-blend-difference"
      />
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ width: label ? 88 : hovering ? 56 : 36, height: label ? 88 : hovering ? 56 : 36 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="pointer-events-none fixed left-0 top-0 z-[89] grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-sunset/70 text-[10px] font-bold uppercase tracking-widest text-white"
      >
        {label && <span className="rounded-full bg-sunset px-2 py-1">{label}</span>}
      </motion.div>
    </>
  );
}

/** Element drifts toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className ?? "inline-block"}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** 3D tilt following the pointer, with a moving glare. */
export function Tilt({ children, className, max = 10 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useTransform([glareX, glareY], ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.25), transparent 50%)`);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={"group/tilt " + (className ?? "")}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
      <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100" />
    </motion.div>
  );
}

/** Small paraglider that drifts across a section on scroll. */
export function FlyingGlider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-10vw", "105vw"]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, -40, 30]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 6, -4]);
  return (
    <div ref={ref} className={"pointer-events-none absolute inset-x-0 overflow-hidden " + (className ?? "")} aria-hidden="true">
      <motion.svg style={{ x, y, rotate }} viewBox="0 0 120 90" className="h-20 w-28 text-sunset drop-shadow-lg sm:h-24 sm:w-32">
        <path d="M6 30C30 4 90 4 114 30c-10-6-22-9-36-10-6-1-30-1-36 0-14 1-26 4-36 10z" fill="currentColor" />
        <path d="M12 26c6-4 14-7 22-8M86 18c8 1 16 4 22 8" stroke="#fff" strokeWidth="1.5" fill="none" opacity=".6" />
        <path d="M10 30 56 70M40 22l16 48M80 22 64 70M110 30 64 70" stroke="currentColor" strokeWidth=".8" opacity=".7" />
        <circle cx="60" cy="74" r="5" fill="#0a0f24" />
        <path d="M54 78h12l-2 8h-8z" fill="#0a0f24" />
      </motion.svg>
    </div>
  );
}
