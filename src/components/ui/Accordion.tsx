"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Faq } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export function Accordion({ items, dark }: { items: Faq[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors duration-300",
              dark
                ? isOpen ? "border-sunset/50 bg-white/[0.07]" : "border-white/10 bg-white/[0.03]"
                : isOpen ? "border-sunset/40 bg-white shadow-lg shadow-sunset/5" : "border-ink/10 bg-white/60",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={cn("flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6", dark ? "text-white" : "text-ink")}
            >
              <span className="font-display text-xs font-bold text-sunset">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-base font-semibold sm:text-lg">{f.q}</span>
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
                  isOpen ? "rotate-45 bg-sunset text-white" : dark ? "bg-white/10" : "bg-ink/5",
                )}
              >
                <Icon name="plus" className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className={cn("px-5 pb-6 pl-14 leading-relaxed sm:px-6 sm:pl-[3.75rem]", dark ? "text-white/70" : "text-muted")}>
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
