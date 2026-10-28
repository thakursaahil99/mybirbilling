"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { media } from "@/lib/utils";

/** Brief branded intro, shown once per browser session. */
export function Preloader() {
  const { settings } = useSite();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("mbb-intro") === "1";
      sessionStorage.setItem("mbb-intro", "1");
    } catch {}
    const t = setTimeout(() => setShow(false), seen ? 0 : 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="size-24 overflow-hidden rounded-full ring-4 ring-sunset/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media(settings.logo)} alt="" className="size-full object-cover" />
            </motion.div>
            <div className="mt-6 overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl font-extrabold tracking-tight text-white"
              >
                Ready to <span className="text-gradient italic">Fly</span>
              </motion.p>
            </div>
            <motion.div
              className="mt-5 h-0.5 w-40 origin-left rounded bg-sunset"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
