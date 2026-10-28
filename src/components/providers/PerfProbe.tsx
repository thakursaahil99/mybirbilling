"use client";

import { useEffect } from "react";
import { enableLite, isLite } from "@/lib/perf";

/**
 * Samples the frame rate once the intro has settled; if the device can't keep
 * ~40fps with the full effects running, switch to lite mode.
 */
export function PerfProbe() {
  useEffect(() => {
    if (isLite()) return;
    let raf = 0;
    let start = 0;
    let last = 0;
    let frames = 0;
    const tick = (t: number) => {
      // A long gap means the tab was hidden or the page paused, not a slow GPU.
      if (last && t - last > 500) return;
      if (!start) start = t;
      last = t;
      frames++;
      if (t - start < 2000) {
        raf = requestAnimationFrame(tick);
      } else if (!document.hidden && (frames * 1000) / (t - start) < 40) {
        enableLite();
      }
    };
    const timer = setTimeout(() => (raf = requestAnimationFrame(tick)), 3000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
