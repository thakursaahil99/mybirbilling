"use client";

import { useEffect, useRef } from "react";
import { media } from "@/lib/utils";

/**
 * Muted looping video that only downloads/plays while on screen.
 * Keeps pages with many clips light on mobile data.
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

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!v.src) v.src = media(src) + "#t=0.1";
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

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
