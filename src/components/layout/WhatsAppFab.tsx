"use client";

import { motion } from "motion/react";
import { useSite } from "@/components/providers/SiteProvider";
import { Icon } from "@/components/ui/Icon";
import { waLink } from "@/lib/utils";

export function WhatsAppFab() {
  const { settings } = useSite();
  return (
    <motion.a
      href={waLink(settings.whatsapp, "Hi, I want to book paragliding")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 18 }}
      className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 lg:flex"
    >
      <span className="pointer-events-none translate-x-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Chat with us
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <Icon name="whatsapp" className="relative size-7" />
      </span>
    </motion.a>
  );
}
