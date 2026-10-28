"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";
import { cn, telLink, waLink } from "@/lib/utils";

/** App-style bottom bar on phones. */
export function BottomNav() {
  const { settings } = useSite();
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/", icon: "home" },
    { label: "Packages", href: "/packages/", icon: "grid" },
    { label: "Book", href: "/book/", icon: "parachute", main: true },
    { label: "Call", href: telLink(settings.phonePrimary), icon: "phone" },
    { label: "Chat", href: waLink(settings.whatsapp, "Hi, I want to book paragliding"), icon: "whatsapp" },
  ];

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 lg:hidden" aria-label="Quick navigation">
      <div className="flex items-end justify-around rounded-[1.75rem] bg-ink/90 px-2 pb-2 pt-2 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-xl">
        {items.map((it) => {
          const active = !it.href.startsWith("tel") && !it.href.startsWith("http") && (it.href === "/" ? pathname === "/" : pathname.startsWith(it.href.replace(/\/$/, "")));
          const content = it.main ? (
            <span className="-mt-7 flex flex-col items-center gap-1">
              <span className="grid size-14 place-items-center rounded-full bg-sunset text-white shadow-lg shadow-sunset/50 ring-4 ring-cream">
                <Icon name={it.icon} className="size-6" />
              </span>
              <span className="text-[10px] font-semibold text-white">{it.label}</span>
            </span>
          ) : (
            <span className={cn("flex flex-col items-center gap-1 px-2 py-1", active ? "text-sunset" : "text-white/60")}>
              <Icon name={it.icon} className="size-5" />
              <span className="text-[10px] font-semibold">{it.label}</span>
            </span>
          );
          return it.href.startsWith("/") ? (
            <Link key={it.label} href={it.href}>
              {content}
            </Link>
          ) : (
            <a key={it.label} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              {content}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
