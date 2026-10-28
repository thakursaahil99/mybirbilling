"use client";

import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { cn, media } from "@/lib/utils";

export function Logo({ light = true, className }: { light?: boolean; className?: string }) {
  const { settings } = useSite();
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label={settings.brand + " home"}>
      <span className="relative block size-11 overflow-hidden rounded-full ring-2 ring-white/20 transition-transform duration-500 group-hover:rotate-[20deg] sm:size-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media(settings.logo)} alt="" className="size-full object-cover" />
      </span>
      <span className="leading-none">
        <span className={cn("block font-display text-lg font-extrabold tracking-tight sm:text-xl", light ? "text-white" : "text-ink")}>
          {settings.brand}
        </span>
        <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-sunset">{settings.tagline}</span>
      </span>
    </Link>
  );
}
