"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { usePackages, useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { submitBooking } from "@/lib/api";
import { quoteTrip, roomsNeeded, type TripState } from "@/lib/trip";
import { cn, inr, media, waLink } from "@/lib/utils";

function Stepper({ value, onChange, min = 0, max = 30, label }: { value: number; onChange: (n: number) => void; min?: number; max?: number; label: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-semibold text-ink/70">{label}</span>
      <div className="flex items-center gap-1 rounded-full bg-cream p-1">
        <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(min, value - 1))} className="grid size-9 place-items-center rounded-full bg-white text-lg font-bold shadow-sm transition hover:bg-ink hover:text-white disabled:opacity-40" disabled={value <= min}>
          −
        </button>
        <motion.span key={value} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-9 text-center font-display text-lg font-bold">
          {value}
        </motion.span>
        <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(Math.min(max, value + 1))} className="grid size-9 place-items-center rounded-full bg-white text-lg font-bold shadow-sm transition hover:bg-ink hover:text-white disabled:opacity-40" disabled={value >= max}>
          +
        </button>
      </div>
    </div>
  );
}

function Block({ n, title, subtitle, children }: { n: number; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="card p-5 sm:p-7"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink font-display font-bold text-white">{n}</span>
        <div>
          <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
          <p className="text-sm text-muted">{subtitle}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </motion.div>
  );
}

export function TripBuilder() {
  const { stays, extras, settings } = useSite();
  const packages = usePackages();
  const params = useSearchParams();

  const [s, setS] = useState<TripState>(() => {
    const stay = stays.find((x) => x.slug === params.get("stay"));
    const pkg = packages.find((x) => x.slug === params.get("package"));
    return {
      packageId: pkg?.id ?? packages.find((p) => p.popular)?.id ?? null,
      travellers: 2,
      stayId: stay?.id ?? stays.find((x) => x.popular)?.id ?? null,
      nights: 2,
      rooms: 1,
      mealsPerDay: 2,
      scootyDays: 1,
    };
  });
  const [date, setDate] = useState("");
  const [info, setInfo] = useState({ name: "", phone: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const pkg = packages.find((p) => p.id === s.packageId);
  const stay = stays.find((x) => x.id === s.stayId);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // "Add to my trip" buttons on the page link here with ?stay=<slug>.
  const stayParam = params.get("stay");
  useEffect(() => {
    const picked = stays.find((x) => x.slug === stayParam);
    if (picked) setS((v) => ({ ...v, stayId: picked.id }));
  }, [stayParam, stays]);

  // Keep the room count sensible whenever the group or room type changes.
  useEffect(() => {
    if (stay) setS((v) => ({ ...v, rooms: roomsNeeded(stay, v.travellers) }));
  }, [stay, s.travellers]);

  const quote = quoteTrip(s, pkg, stay, extras, settings.comboDiscount);
  const set = (patch: Partial<TripState>) => setS((v) => ({ ...v, ...patch }));
  const canSubmit = quote.total > 0 && !!date && info.name.trim().length > 1 && /^[0-9+\s-]{8,16}$/.test(info.phone.trim());

  async function submit() {
    setStatus("sending");
    setError("");
    try {
      const saved = await submitBooking({
        packageId: pkg?.id ?? null,
        date,
        persons: s.travellers,
        name: info.name,
        phone: info.phone,
        notes: info.notes,
        addStay: !!stay,
        stay: stay ? { stayId: stay.id, nights: s.nights, units: stay.pricing === "person" ? s.travellers : s.rooms } : null,
        extras: extras
          .map((e) => ({ extraId: e.id, qty: e.unit === "meal" ? s.mealsPerDay * Math.max(1, s.nights) * s.travellers : e.unit === "day" ? s.scootyDays : 0 }))
          .filter((e) => e.qty > 0),
        quotedTotal: quote.total,
      });
      if (!saved) {
        const text = [
          "Hi MyBirBilling! I'd like to book this custom trip:",
          ...quote.lines.map((l) => `• ${l.label} — ${l.detail} = ${inr(l.amount)}`),
          quote.discount ? `• Combo discount −${inr(quote.discount)}` : "",
          `Total: ${inr(quote.total)}`,
          `Arrival: ${date} · Travellers: ${s.travellers}`,
          "",
          `Name: ${info.name}`,
          `Phone: ${info.phone}`,
          info.notes ? `Notes: ${info.notes}` : "",
        ]
          .filter(Boolean)
          .join("\n");
        window.open(waLink(settings.whatsapp, text), "_blank");
      }
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
      <div className="min-w-0 space-y-5">
        <Block n={1} title="Fly" subtitle="Pick a flight or course — or skip if you're only here to stay.">
          <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
            <button
              type="button"
              onClick={() => set({ packageId: null })}
              className={cn("w-40 shrink-0 rounded-2xl border-2 p-4 text-left transition", s.packageId === null ? "border-sunset bg-sunset/5" : "border-ink/10 hover:border-ink/30")}
            >
              <Icon name="x" className="size-5 text-muted" />
              <p className="mt-3 font-semibold">No flight</p>
              <p className="text-xs text-muted">Stay only</p>
            </button>
            {packages.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => set({ packageId: p.id })}
                className={cn(
                  "group relative w-52 shrink-0 overflow-hidden rounded-2xl border-2 text-left transition",
                  s.packageId === p.id ? "border-sunset shadow-lg shadow-sunset/15" : "border-transparent hover:border-ink/20",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media(p.image)} alt="" className="h-24 w-full object-cover" loading="lazy" />
                <div className="bg-white p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sunset">{p.level}</p>
                  <p className="line-clamp-1 text-sm font-bold capitalize">{p.title}</p>
                  <p className="mt-1 flex justify-between text-xs text-muted">
                    {p.duration} <b className="text-ink">{inr(p.price)}</b>
                  </p>
                </div>
                {s.packageId === p.id && (
                  <motion.span layoutId="trip-pkg" className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-sunset text-white shadow-lg">
                    <Icon name="check" className="size-4" />
                  </motion.span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-5 border-t border-ink/5 pt-5">
            <Stepper label="Travellers" value={s.travellers} min={1} max={20} onChange={(n) => set({ travellers: n })} />
          </div>
        </Block>

        <Block n={2} title="Stay" subtitle="Choose a room type and how many nights you'll be in Bir.">
          <div className="grid gap-3 sm:grid-cols-2">
            {stays.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => set({ stayId: s.stayId === x.id ? null : x.id })}
                className={cn(
                  "group relative flex gap-3 overflow-hidden rounded-2xl border-2 p-2 text-left transition",
                  s.stayId === x.id ? "border-sunset bg-sunset/5" : "border-ink/10 hover:border-ink/30",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media(x.images[0] ?? x.image).replace("w=1600", "w=400")} alt="" className="size-20 shrink-0 rounded-xl object-cover" loading="lazy" />
                <div className="py-1">
                  <p className="font-bold">{x.title}</p>
                  <p className="text-xs text-muted">{x.tagline}</p>
                  <p className="mt-1 text-sm">
                    <b>{inr(x.price)}</b> <span className="text-xs text-muted">/ {x.pricing === "person" ? "bed" : "room"} / night</span>
                  </p>
                </div>
                {s.stayId === x.id && (
                  <motion.span layoutId="trip-stay" className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-sunset text-white">
                    <Icon name="check" className="size-3.5" />
                  </motion.span>
                )}
              </button>
            ))}
          </div>
          <AnimatePresence initial={false}>
            {stay && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="mt-5 space-y-4 border-t border-ink/5 pt-5">
                  <Stepper label="Nights" value={s.nights} min={1} max={30} onChange={(n) => set({ nights: n })} />
                  {stay.pricing === "room" ? (
                    <Stepper label={`Rooms (sleeps ${stay.capacity} each)`} value={s.rooms} min={roomsNeeded(stay, s.travellers)} max={20} onChange={(n) => set({ rooms: n })} />
                  ) : (
                    <p className="text-sm text-muted">{s.travellers} bed{s.travellers > 1 ? "s" : ""} — one per traveller.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Block>

        <Block n={3} title="Food & extras" subtitle="Home-style meals and a scooty to explore Bir's cafés and monasteries.">
          <div className="space-y-5">
            {extras.map((e) => (
              <div key={e.id} className="flex flex-col gap-3 rounded-2xl bg-cream/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-sunset shadow-sm">
                    <Icon name={e.icon} className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">
                      {e.title} <span className="text-sm text-sunset">{inr(e.price)} / {e.unit}</span>
                    </p>
                    <p className="text-xs text-muted">{e.description}</p>
                  </div>
                </div>
                {e.unit === "meal" ? (
                  <div className="flex gap-1 rounded-full bg-white p-1 shadow-sm">
                    {[0, 1, 2, 3].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => set({ mealsPerDay: n })}
                        className={cn("relative rounded-full px-3 py-1.5 text-xs font-semibold", s.mealsPerDay === n ? "text-white" : "text-ink/60")}
                      >
                        {s.mealsPerDay === n && <motion.span layoutId="meal-pill" className="absolute inset-0 rounded-full bg-ink" />}
                        <span className="relative">{n === 0 ? "None" : `${n}/day`}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <Stepper label="Days" value={s.scootyDays} max={30} onChange={(n) => set({ scootyDays: n })} />
                )}
              </div>
            ))}
          </div>
        </Block>

        <Block n={4} title="Your details" subtitle="We'll confirm availability and share payment details on WhatsApp.">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="label" htmlFor="t-date">Arrival date *</label>
              <input id="t-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="input" />
            </div>
            <div>
              <label className="label" htmlFor="t-name">Name *</label>
              <input id="t-name" className="input" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} autoComplete="name" />
            </div>
            <div>
              <label className="label" htmlFor="t-phone">Phone / WhatsApp *</label>
              <input id="t-phone" type="tel" className="input" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} autoComplete="tel" placeholder="+91" />
            </div>
          </div>
          <div className="mt-4">
            <label className="label" htmlFor="t-notes">Notes</label>
            <textarea id="t-notes" rows={2} className="input resize-none" value={info.notes} onChange={(e) => setInfo({ ...info, notes: e.target.value })} placeholder="Pickup from bus stand, celebration, dietary needs…" />
          </div>
        </Block>
      </div>

      {/* Live quote */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-[2rem] bg-ink text-white shadow-2xl shadow-ink/30">
          <div className="relative p-6">
            <div className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full bg-sunset/30 blur-2xl" />
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">Your custom trip</p>
            <p className="mt-1 font-display text-2xl font-bold">
              {s.travellers} traveller{s.travellers > 1 ? "s" : ""} · {stay ? `${s.nights} night${s.nights > 1 ? "s" : ""}` : "no stay"}
            </p>
          </div>

          <ul className="space-y-3 border-t border-white/10 p-6">
            <AnimatePresence initial={false}>
              {quote.lines.length === 0 && (
                <motion.li key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-white/50">
                  Pick a flight, stay or extras to see your price.
                </motion.li>
              )}
              {quote.lines.map((l) => (
                <motion.li
                  key={l.label}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex justify-between gap-3 text-sm"
                >
                  <span>
                    <span className="block font-semibold capitalize">{l.label}</span>
                    <span className="text-xs text-white/50">{l.detail}</span>
                  </span>
                  <span className="font-semibold">{inr(l.amount)}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="space-y-2 border-t border-white/10 p-6 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Subtotal</span>
              <span>{inr(quote.subtotal)}</span>
            </div>
            <AnimatePresence>
              {quote.comboApplies ? (
                <motion.div key="combo" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex justify-between rounded-xl bg-emerald-500/15 px-3 py-2 text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Icon name="sparkles" className="size-4" /> Fly + Stay combo −{settings.comboDiscount}%
                  </span>
                  <span>−{inr(quote.discount)}</span>
                </motion.div>
              ) : (
                <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-xl bg-white/5 px-3 py-2 text-xs text-white/60">
                  Add a flight and a stay together to unlock {settings.comboDiscount}% OFF.
                </motion.p>
              )}
            </AnimatePresence>
            <div className="flex items-end justify-between pt-3">
              <span className="text-white/60">Total</span>
              <motion.span key={quote.total} initial={{ scale: 1.15, color: "#ff9a4d" }} animate={{ scale: 1, color: "#ffffff" }} className="font-display text-4xl font-black">
                {inr(quote.total)}
              </motion.span>
            </div>
          </div>

          <div className="border-t border-white/10 p-6">
            {status === "done" ? (
              <div className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500">
                  <Icon name="check" className="size-7" />
                </span>
                <p className="mt-3 font-bold">Trip request sent!</p>
                <p className="text-sm text-white/60">Our team will confirm on WhatsApp shortly.</p>
              </div>
            ) : (
              <>
                {status === "error" && <p className="mb-3 rounded-xl bg-red-500/15 px-3 py-2 text-sm text-red-300">{error}</p>}
                <Button onClick={submit} disabled={!canSubmit || status === "sending"} size="lg" icon="arrow-up-right" className="w-full">
                  {status === "sending" ? "Sending…" : "Request this trip"}
                </Button>
                {!canSubmit && <p className="mt-2 text-center text-xs text-white/40">Add arrival date, name & phone to continue</p>}
              </>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
