"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Effects";
import { Icon } from "@/components/ui/Icon";
import { cn, telLink } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { nav } from "./nav";

export function Header() {
  const { settings } = useSite();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev && !menuOpen);
  });

  useEffect(() => {
    setMenuOpen(false);
    setDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Top info strip */}
        <div
          className={cn(
            "hidden overflow-hidden bg-ink/90 text-white/70 transition-all duration-500 xl:block",
            scrolled ? "max-h-0" : "max-h-10",
          )}
        >
          <div className="container-x flex h-9 items-center justify-between text-xs">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {settings.season} · {settings.hours}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="map-pin" className="size-3.5" /> Bir Billing, Himachal Pradesh
              </span>
            </div>
            <div className="flex items-center gap-5">
              <a href={telLink(settings.phonePrimary)} className="flex items-center gap-1.5 hover:text-white">
                <Icon name="phone" className="size-3.5" /> {settings.phonePrimary}
              </a>
              <a href={"mailto:" + settings.email} className="flex items-center gap-1.5 hover:text-white">
                <Icon name="mail" className="size-3.5" /> {settings.email}
              </a>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "transition-all duration-500",
            scrolled ? "bg-ink/80 shadow-2xl shadow-black/20 backdrop-blur-xl" : "bg-gradient-to-b from-black/40 to-transparent",
          )}
        >
          <div className={cn("container-x flex items-center justify-between transition-all duration-500", scrolled ? "h-16" : "h-20")}>
            <Logo />

            <nav className="hidden items-center gap-0.5 xl:flex" onMouseLeave={() => setDropdown(null)}>
              {nav.map((item) => (
                <div key={item.label} className="relative" onMouseEnter={() => setDropdown(item.children ? item.label : null)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive(item.href) ? "text-white" : "text-white/70 hover:text-white",
                    )}
                  >
                    {isActive(item.href) && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/12 ring-1 ring-white/15" />
                    )}
                    {item.label}
                    {item.children && (
                      <Icon name="chevron-down" className={cn("size-3.5 transition-transform", dropdown === item.label && "rotate-180")} />
                    )}
                  </Link>
                  <AnimatePresence>
                    {item.children && dropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
                      >
                        <div className="rounded-3xl bg-white p-2 shadow-2xl shadow-black/25">
                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-cream"
                            >
                              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sunset/10 text-sunset transition-colors group-hover:bg-sunset group-hover:text-white">
                                <Icon name={c.icon} className="size-5" />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-ink">{c.label}</span>
                                <span className="block text-xs text-muted">{c.desc}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Magnetic className="hidden sm:inline-block">
                <Button href="/book/" size="md" icon="arrow-up-right">
                  Book Now
                </Button>
              </Magnetic>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-md xl:hidden"
                aria-label="Open menu"
              >
                <Icon name="menu" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
