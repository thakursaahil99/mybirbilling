"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { usePackages, useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { submitBooking } from "@/lib/api";
import { cn, inr, waLink } from "@/lib/utils";

const steps = ["Package", "Date & Group", "Your Details", "Confirm"];

export function BookingWizard() {
  const { settings } = useSite();
  const all = usePackages();
  const params = useSearchParams();
  const initial = all.find((p) => p.slug === params.get("package"));

  const [step, setStep] = useState(initial ? 1 : 0);
  const [dir, setDir] = useState(1);
  const [pkgId, setPkgId] = useState<number | null>(initial?.id ?? null);
  const [date, setDate] = useState("");
  const [persons, setPersons] = useState(1);
  const [addStay, setAddStay] = useState(false);
  const [info, setInfo] = useState({ name: "", phone: "", email: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const pkg = all.find((p) => p.id === pkgId);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const maxPersons = pkg?.category === "course" ? 4 : 10;
  const total = pkg ? pkg.price * persons : 0;
  const advance = pkg ? pkg.advance * persons : 0;

  const canNext = [!!pkg, !!date && persons > 0, info.name.trim().length > 1 && /^[0-9+\s-]{8,16}$/.test(info.phone.trim()), true][step];

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  async function confirm() {
    if (!pkg) return;
    setStatus("sending");
    setError("");
    try {
      const saved = await submitBooking({ packageId: pkg.id, date, persons, addStay, ...info });
      if (!saved) {
        const text = [
          `Hi MyBirBilling! I'd like to book:`,
          `• ${pkg.title}`,
          `• Date: ${date}`,
          `• Persons: ${persons}`,
          addStay ? `• Also need a stay (10% combo offer)` : "",
          `• Total: ${inr(total)} (advance ${inr(advance)})`,
          ``,
          `Name: ${info.name}`,
          `Phone: ${info.phone}`,
          info.email ? `Email: ${info.email}` : "",
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

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card mx-auto max-w-xl p-10 text-center">
        <motion.span
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="mx-auto grid size-24 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30"
        >
          <Icon name="check" className="size-12" />
        </motion.span>
        <h2 className="mt-8 text-4xl font-black">You&apos;re almost in the sky!</h2>
        <p className="mt-3 text-muted">
          We&apos;ve received your booking request for <b className="text-ink">{pkg?.title}</b> on <b className="text-ink">{date}</b>. Our team will call you shortly to
          confirm your slot and share payment details.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="outline">Back to Home</Button>
          <Button href={waLink(settings.whatsapp, `Hi, I just booked ${pkg?.title} for ${date}`)} variant="whatsapp" iconLeft="whatsapp">
            Chat with us
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="card overflow-hidden">
        {/* Stepper */}
        <div className="border-b border-ink/5 p-5 sm:p-7">
          <ol className="flex items-center gap-2">
            {steps.map((s, i) => (
              <li key={s} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  disabled={i > step}
                  onClick={() => go(i)}
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold transition-all duration-500",
                    i < step ? "bg-emerald-500 text-white" : i === step ? "bg-sunset text-white ring-4 ring-sunset/20" : "bg-ink/5 text-ink/40",
                  )}
                >
                  {i < step ? <Icon name="check" className="size-4" /> : i + 1}
                </button>
                <span className={cn("hidden text-sm font-semibold md:block", i === step ? "text-ink" : "text-ink/40")}>{s}</span>
                {i < steps.length - 1 && (
                  <span className="relative h-0.5 flex-1 overflow-hidden rounded bg-ink/5">
                    <motion.span className="absolute inset-y-0 left-0 bg-emerald-500" animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="relative min-h-[26rem] overflow-hidden p-5 sm:p-8">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 && (
                <div>
                  <h2 className="text-2xl font-bold">Choose your experience</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {all.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPkgId(p.id)}
                        className={cn(
                          "relative rounded-2xl border-2 p-4 text-left transition-all",
                          pkgId === p.id ? "border-sunset bg-sunset/5 shadow-lg shadow-sunset/10" : "border-ink/10 hover:border-ink/30",
                        )}
                      >
                        <span className="text-[11px] font-bold uppercase tracking-widest text-sunset">{p.level}</span>
                        <span className="mt-1 block font-display text-lg font-bold capitalize">{p.title}</span>
                        <span className="mt-2 flex items-center justify-between text-sm text-muted">
                          <span className="flex items-center gap-1"><Icon name="clock" className="size-3.5" /> {p.duration}</span>
                          <span className="font-display text-lg font-bold text-ink">{inr(p.price)}</span>
                        </span>
                        {pkgId === p.id && (
                          <motion.span layoutId="pkg-check" className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-sunset text-white">
                            <Icon name="check" className="size-3.5" />
                          </motion.span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold">When do you want to fly?</h2>
                    <p className="mt-1 text-sm text-muted">Best flying time is 10 AM – 4 PM. We&apos;ll confirm the exact slot by phone.</p>
                    <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="input mt-5 max-w-xs" aria-label="Flight date" />
                  </div>
                  <div>
                    <p className="label">{pkg?.category === "course" ? "Students" : "Flyers"}</p>
                    <div className="flex items-center gap-4">
                      <button type="button" aria-label="Fewer" onClick={() => setPersons((n) => Math.max(1, n - 1))} className="grid size-12 place-items-center rounded-full border border-ink/15 text-xl font-bold hover:bg-ink hover:text-white">−</button>
                      <motion.span key={persons} initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-12 text-center font-display text-4xl font-black">
                        {persons}
                      </motion.span>
                      <button type="button" aria-label="More" onClick={() => setPersons((n) => Math.min(maxPersons, n + 1))} className="grid size-12 place-items-center rounded-full border border-ink/15 text-xl font-bold hover:bg-ink hover:text-white">+</button>
                    </div>
                  </div>
                  <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-ink/10 p-4 transition hover:border-sunset/50">
                    <input type="checkbox" checked={addStay} onChange={(e) => setAddStay(e.target.checked)} className="mt-1 size-5 accent-[#f2762e]" />
                    <span>
                      <span className="block font-semibold">Add a stay & get 10% OFF</span>
                      <span className="text-sm text-muted">Bunks from ₹499, rooms from ₹1,500 per night. We&apos;ll share options.</span>
                    </span>
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Your details</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="b-name">Full name *</label>
                      <input id="b-name" className="input" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} autoComplete="name" />
                    </div>
                    <div>
                      <label className="label" htmlFor="b-phone">Phone / WhatsApp *</label>
                      <input id="b-phone" type="tel" className="input" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} autoComplete="tel" placeholder="+91" />
                    </div>
                  </div>
                  <div>
                    <label className="label" htmlFor="b-email">Email</label>
                    <input id="b-email" type="email" className="input" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} autoComplete="email" />
                  </div>
                  <div>
                    <label className="label" htmlFor="b-notes">Anything we should know?</label>
                    <textarea id="b-notes" rows={3} className="input resize-none" value={info.notes} onChange={(e) => setInfo({ ...info, notes: e.target.value })} placeholder="Weights of flyers, pickup needs, celebrations…" />
                  </div>
                </div>
              )}

              {step === 3 && pkg && (
                <div>
                  <h2 className="text-2xl font-bold">Review & confirm</h2>
                  <dl className="mt-6 divide-y divide-ink/5 rounded-2xl bg-cream/60 px-5">
                    {[
                      ["Package", pkg.title],
                      ["Date", date],
                      [pkg.category === "course" ? "Students" : "Flyers", String(persons)],
                      ["Stay add-on", addStay ? "Yes — 10% combo offer" : "No"],
                      ["Name", info.name],
                      ["Phone", info.phone],
                      ...(info.email ? [["Email", info.email]] : []),
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 py-3 text-sm">
                        <dt className="text-muted">{k}</dt>
                        <dd className="text-right font-semibold capitalize">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-xs text-muted">
                    By confirming you agree to our cancellation policy and safety guidelines. Payment details are shared after our team confirms your slot.
                  </p>
                  {status === "error" && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between border-t border-ink/5 p-5 sm:px-8">
          <Button variant="outline" iconLeft="arrow-left" onClick={() => go(step - 1)} disabled={step === 0}>
            Back
          </Button>
          {step < 3 ? (
            <Button icon="arrow-right" onClick={() => go(step + 1)} disabled={!canNext}>
              Continue
            </Button>
          ) : (
            <Button icon="check" onClick={confirm} disabled={status === "sending"}>
              {status === "sending" ? "Booking…" : "Confirm Booking"}
            </Button>
          )}
        </div>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-[2rem] bg-ink text-white">
          <div className="relative p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-sunset/30 blur-2xl" />
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">Booking summary</p>
            <AnimatePresence mode="wait">
              <motion.p key={pkg?.id ?? "none"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-2 font-display text-2xl font-bold capitalize">
                {pkg?.title ?? "Select a package"}
              </motion.p>
            </AnimatePresence>
            {pkg && <p className="text-sm text-white/60">{pkg.duration} · Bir Billing</p>}
          </div>
          <div className="space-y-3 border-t border-white/10 p-6 text-sm">
            <div className="flex justify-between"><span className="text-white/60">Price</span><span>{pkg ? `${inr(pkg.price)} × ${persons}` : "—"}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Date</span><span>{date || "—"}</span></div>
            <div className="flex items-end justify-between border-t border-white/10 pt-4">
              <span className="text-white/60">Total</span>
              <motion.span key={total} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="font-display text-3xl font-black">{inr(total)}</motion.span>
            </div>
            <div className="flex justify-between rounded-xl bg-sunset/15 px-3 py-2 text-sunset-2">
              <span>Advance to book</span>
              <span className="font-bold">{inr(advance)}</span>
            </div>
          </div>
          <div className="space-y-2 border-t border-white/10 p-6 text-xs text-white/60">
            {["Certified pilots & equipment", "Free reschedule for bad weather", "GoPro video available"].map((t) => (
              <p key={t} className="flex items-center gap-2"><Icon name="shield" className="size-4 text-sunset" /> {t}</p>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
