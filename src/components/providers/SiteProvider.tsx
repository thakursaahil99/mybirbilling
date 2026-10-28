"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchSite } from "@/lib/api";
import type { SiteData } from "@/lib/types";

const SiteContext = createContext<SiteData | null>(null);

export function SiteProvider({ initial, children }: { initial: SiteData; children: React.ReactNode }) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    let alive = true;
    fetchSite().then((fresh) => {
      if (alive && fresh) setData(fresh);
    });
    return () => {
      alive = false;
    };
  }, []);

  return <SiteContext.Provider value={data}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}

export function usePackages(category?: "tandem" | "course") {
  const { packages } = useSite();
  return packages
    .filter((p) => p.active && (!category || p.category === category))
    .sort((a, b) => a.order - b.order);
}
