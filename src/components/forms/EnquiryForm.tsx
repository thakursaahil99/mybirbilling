"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { submitEnquiry } from "@/lib/api";
import { waLink } from "@/lib/utils";

export function EnquiryForm({ source = "website", compact }: { source?: string; compact?: boolean }) {
  const { settings } = useSite();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      source,
    };
    setStatus("sending");
    setError("");
    try {
      const saved = await submitEnquiry(data);
      if (!saved) {
        // No API configured yet: hand the enquiry over to WhatsApp.
        const text = `Hi MyBirBilling!\nName: ${data.name}\nPhone: ${data.phone}${data.email ? `\nEmail: ${data.email}` : ""}\n\n${data.message}`;
        window.open(waLink(settings.whatsapp, text), "_blank");
      }
      setStatus("done");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
              className="grid size-20 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
            >
              <Icon name="check" className="size-10" />
            </motion.span>
            <p className="mt-6 font-display text-2xl font-bold">Thank you!</p>
            <p className="mt-2 max-w-sm text-muted">We&apos;ve received your query. Our team will get back to you shortly.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-sunset hover:underline">
              Send another query
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} className="space-y-4">
            <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
              <div>
                <label className="label" htmlFor={`${source}-name`}>Full name</label>
                <input id={`${source}-name`} name="name" required minLength={2} className="input" placeholder="Your name" autoComplete="name" />
              </div>
              <div>
                <label className="label" htmlFor={`${source}-phone`}>Phone number</label>
                <input id={`${source}-phone`} name="phone" required type="tel" pattern="[0-9+\s\-]{8,16}" className="input" placeholder="+91 98765 43210" autoComplete="tel" />
              </div>
            </div>
            <div>
              <label className="label" htmlFor={`${source}-email`}>Email (optional)</label>
              <input id={`${source}-email`} name="email" type="email" className="input" placeholder="you@email.com" autoComplete="email" />
            </div>
            <div>
              <label className="label" htmlFor={`${source}-message`}>Your query</label>
              <textarea id={`${source}-message`} name="message" required rows={compact ? 3 : 4} className="input resize-none" placeholder="Tell us your dates, group size or the package you're interested in…" />
            </div>
            {status === "error" && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
            <Button type="submit" size="lg" icon="send" className="w-full" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send Inquiry"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
