"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Effects";
import { Icon } from "@/components/ui/Icon";
import { SplitText } from "@/components/ui/Motion";
import { media, telLink } from "@/lib/utils";

export function CtaBanner({
  title = "Your Himalayan adventure awaits",
  text = "Don't just dream about flying. Soar through the majestic skies of Bir Billing with our certified expert pilots.",
}: {
  title?: string;
  text?: string;
}) {
  const { settings } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(8% 6% 8% 6% round 3rem)", "inset(0% 0% 0% 0% round 2rem)"]);

  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <motion.div ref={ref} style={{ clipPath: clip }} className="grain relative overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-center text-white sm:px-12 sm:py-28">
          <motion.div style={{ y }} className="absolute -inset-y-[20%] inset-x-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={media("/uploads/media/compressed_g15.jpg")} alt="" className="size-full object-cover opacity-40" loading="lazy" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink/90" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-4xl font-black leading-[1] sm:text-6xl">
              <SplitText text={title} />
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">{text}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Button href="/book/" size="lg" icon="arrow-up-right">
                  Book Your Flight
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href={telLink(settings.phonePrimary)} size="lg" variant="ghost-light" iconLeft="phone">
                  Talk to an Expert
                </Button>
              </Magnetic>
            </div>
            <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              {["Certified Pilots", "Safety First", "Best Price Guarantee", "Video & Photos"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Icon name="check" className="size-4 text-sunset" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
