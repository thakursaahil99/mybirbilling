"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLite } from "@/lib/perf";

export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const lite = useLite();

  useEffect(() => {
    // Native scrolling stays smooth on slow machines; Lenis there just stutters.
    if (lite || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.current = l;
    let raf = 0;
    const loop = (t: number) => {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      lenis.current = null;
    };
  }, [lite]);

  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
