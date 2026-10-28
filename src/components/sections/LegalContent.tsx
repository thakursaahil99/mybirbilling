"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Motion";
import { cn, telLink, waLink } from "@/lib/utils";

export function LegalContent({ slug }: { slug: string }) {
  const { pages, settings } = useSite();
  const page = pages.find((p) => p.slug === slug);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!page) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    page.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [page]);

  if (!page) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-xs font-bold uppercase tracking-widest text-muted">On this page</p>
            <ul className="mt-4 space-y-1 border-l border-ink/10">
              {page.sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={cn(
                      "-ml-px block border-l-2 py-2 pl-4 text-sm transition",
                      active === s.id ? "border-sunset font-semibold text-ink" : "border-transparent text-muted hover:text-ink",
                    )}
                  >
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-muted">Last updated: {page.updated}</p>
          </div>
        </aside>

        <div className="max-w-3xl">
          {page.intro && (
            <Reveal>
              <p className="text-xl leading-relaxed text-ink/80">{page.intro}</p>
            </Reveal>
          )}
          <div className="mt-6 space-y-6">
            {page.sections.map((s, i) => (
              <Reveal key={s.id}>
                <article id={s.id} className="scroll-mt-28 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8">
                  <h2 className="flex items-baseline gap-3 text-2xl font-extrabold sm:text-3xl">
                    <span className="font-display text-base text-sunset">{String(i + 1).padStart(2, "0")}</span>
                    {s.heading}
                  </h2>
                  {s.paragraphs?.map((p) => (
                    <p key={p} className="mt-4 leading-relaxed text-muted">{p}</p>
                  ))}
                  {s.items && (
                    <ul className="mt-5 space-y-3">
                      {s.items.map((it, k) => (
                        <motion.li
                          key={it.label}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: k * 0.05 }}
                          className="flex gap-3 rounded-2xl bg-cream/70 p-4"
                        >
                          <Icon name="check" className="mt-0.5 size-5 shrink-0 text-sunset" />
                          <span>
                            <b className="text-ink">{it.label}:</b> <span className="text-muted">{it.text}</span>
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                  {s.note && (
                    <p className="mt-5 flex gap-3 rounded-2xl border-l-4 border-sunset bg-sunset/5 p-4 text-sm font-medium text-ink">
                      <Icon name="shield" className="size-5 shrink-0 text-sunset" />
                      {s.note}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 rounded-[2rem] bg-ink p-8 text-white">
              <h2 className="text-2xl font-bold">Questions? We&apos;re happy to help.</h2>
              <p className="mt-2 text-white/60">Keep your booking ID or registered phone number ready.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={telLink(settings.phonePrimary)} iconLeft="phone">{settings.phonePrimary}</Button>
                <Button href={waLink(settings.whatsapp)} variant="whatsapp" iconLeft="whatsapp">WhatsApp Us</Button>
                <Button href={"mailto:" + settings.email} variant="ghost-light" iconLeft="mail">Email</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
