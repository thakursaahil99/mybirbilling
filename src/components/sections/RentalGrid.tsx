"use client";

import { motion } from "motion/react";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";
import { cn, inr, waLink } from "@/lib/utils";

const icons = ["parachute", "shield", "user", "globe", "wind", "sparkles"];

export function RentalGrid() {
  const { rentals, settings } = useSite();
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rentals.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-[2rem] p-7",
                r.bestValue ? "bg-ink text-white shadow-2xl shadow-ink/30" : "bg-white shadow-sm ring-1 ring-ink/5",
              )}
            >
              {r.bestValue && <span className="absolute right-5 top-5 rounded-full bg-sunset px-3 py-1 text-xs font-bold uppercase tracking-widest">Best Value</span>}
              <span className={cn("grid size-14 place-items-center rounded-2xl", r.bestValue ? "bg-white/10 text-sunset" : "bg-cream text-sunset")}>
                <Icon name={icons[i % icons.length]} className="size-7" />
              </span>
              <h3 className="mt-6 text-2xl font-bold">{r.title}</h3>
              <p className={cn("mt-1 text-sm", r.bestValue ? "text-white/60" : "text-muted")}>{r.description}</p>
              <p className="mt-6 font-display text-4xl font-black">
                {inr(r.price)}
                <span className={cn("ml-1 text-sm font-medium", r.bestValue ? "text-white/60" : "text-muted")}>/ day</span>
              </p>
              {r.note && <p className="mt-1 text-sm font-semibold text-sunset">{r.note}</p>}
              <div className="mt-6 pt-2">
                {r.available ? (
                  <Button href={waLink(settings.whatsapp, `Hi, I want to rent: ${r.title}`)} variant={r.bestValue ? "primary" : "dark"} size="md" icon="arrow-up-right" className="w-full">
                    Enquire to Rent
                  </Button>
                ) : (
                  <span className={cn("block rounded-full py-3 text-center text-sm font-semibold", r.bestValue ? "bg-white/10 text-white/70" : "bg-ink/5 text-ink/50")}>
                    Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="grid gap-8 rounded-[2rem] bg-sand/70 p-8 sm:p-10 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold">Documents required</h3>
              <ul className="mt-4 space-y-3">
                {["Valid pilot license (P2 minimum)", "Government ID proof", "Security deposit required"].map((t) => (
                  <li key={t} className="flex items-center gap-3"><Icon name="check" className="size-5 text-sunset" /> {t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Rental terms</h3>
              <ul className="mt-4 space-y-3">
                {["24-hour advance booking", "Damage charges applicable", "Equipment inspection before use"].map((t) => (
                  <li key={t} className="flex items-center gap-3"><Icon name="check" className="size-5 text-sunset" /> {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
