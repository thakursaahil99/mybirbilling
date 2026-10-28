"use client";

import { useEffect, useRef } from "react";
import { useLite } from "@/lib/perf";
import { media } from "@/lib/utils";

/**
 * Muted looping video that only downloads near the viewport and only plays
 * while actually on screen. Keeps pages with many clips light on mobile data.
 * In lite mode it shows a still frame and plays only while its card is hovered,
 * so slow GPUs never decode a stack of clips at once.
 */
export function LazyVideo({
  src,
  className,
  poster,
  eager,
}: {
  src: string;
  className?: string;
  poster?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const lite = useLite();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const load = () => {
      if (!v.src) v.src = media(src) + "#t=0.1";
    };
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (lite) v.preload = "metadata";
          load();
          preload.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    preload.observe(v);

    if (lite) {
      v.pause();
      const host = v.closest<HTMLElement>(".group") ?? v.parentElement ?? v;
      const play = () => {
        load();
        v.play().catch(() => {});
      };
      const stop = () => v.pause();
      host.addEventListener("pointerenter", play);
      host.addEventListener("pointerleave", stop);
      return () => {
        preload.disconnect();
        host.removeEventListener("pointerenter", play);
        host.removeEventListener("pointerleave", stop);
      };
    }

    const visible = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.15 },
    );
    visible.observe(v);
    return () => {
      preload.disconnect();
      visible.disconnect();
    };
  }, [src, lite]);

  return (
    <video
      ref={ref}
      className={className}
      src={eager ? media(src) : undefined}
      poster={poster ? media(poster) : undefined}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload={eager ? "auto" : "none"}
    />
  );
}
