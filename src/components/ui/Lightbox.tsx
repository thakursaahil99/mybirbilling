"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "@/lib/types";
import { media } from "@/lib/utils";
import { Icon } from "./Icon";

export function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (index === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
    };
  }, [index, items.length, onChange, onClose]);

  if (!mounted) return null;
  const item = index !== null ? items[index] : null;

  return createPortal(
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button type="button" aria-label="Close" onClick={onClose} className="absolute right-4 top-4 z-10 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <Icon name="x" />
          </button>
          <p className="absolute left-6 top-7 text-sm font-medium text-white/60">
            {index + 1} / {items.length}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) onChange((index + 1) % items.length);
                if (info.offset.x > 80) onChange((index - 1 + items.length) % items.length);
              }}
            >
              {item.type === "video" ? (
                <video src={media(item.src)} className="max-h-[85vh] rounded-2xl" controls autoPlay playsInline />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={media(item.src)} alt={item.title} className="max-h-[85vh] rounded-2xl object-contain" draggable={false} />
              )}
            </motion.div>
          </AnimatePresence>

          {[
            { dir: -1, icon: "chevron-left", cls: "left-3 sm:left-6" },
            { dir: 1, icon: "chevron-right", cls: "right-3 sm:right-6" },
          ].map((b) => (
            <button
              key={b.dir}
              type="button"
              aria-label={b.dir < 0 ? "Previous" : "Next"}
              onClick={(e) => {
                e.stopPropagation();
                onChange((index + b.dir + items.length) % items.length);
              }}
              className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-sunset ${b.cls}`}
            >
              <Icon name={b.icon} />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
