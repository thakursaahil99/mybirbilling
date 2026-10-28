"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { telLink, waLink } from "@/lib/utils";
import { Logo } from "./Logo";
import { nav } from "./nav";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { settings } = useSite();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const links = nav
    .flatMap((n) => (n.children ? n.children.map((c) => ({ label: c.label, href: c.href })) : [n]))
    .filter((l, i, all) => all.findIndex((x) => x.href === l.href) === i);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-white"
          initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-sunset/25 blur-3xl" />
          <div className="container-x flex h-20 shrink-0 items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20"
              aria-label="Close menu"
            >
              <Icon name="x" className="size-5" />
            </button>
          </div>

          <nav className="container-x flex-1 py-6">
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className="group flex items-center justify-between border-b border-white/10 py-3.5"
                  >
                    <span className="font-display text-3xl font-bold tracking-tight transition-colors group-hover:text-sunset">
                      {l.label}
                    </span>
                    <Icon name="arrow-up-right" className="size-5 text-white/40 transition group-hover:text-sunset" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-x shrink-0 space-y-3 pb-28 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-3">
              <Button href={waLink(settings.whatsapp, "Hi, I want to book paragliding")} variant="whatsapp" iconLeft="whatsapp">
                WhatsApp
              </Button>
              <Button href={telLink(settings.phonePrimary)} variant="ghost-light" iconLeft="phone">
                Call Us
              </Button>
            </div>
            <p className="text-center text-xs text-white/50">
              {settings.season} · {settings.hours}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
