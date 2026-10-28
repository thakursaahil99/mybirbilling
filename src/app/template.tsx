"use client";

import { motion } from "motion/react";

// Re-mounts on every navigation, giving each page an entrance transition.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </motion.div>
    </>
  );
}
