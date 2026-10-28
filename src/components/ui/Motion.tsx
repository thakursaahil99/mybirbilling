"use client";

import { animate, motion, useInView, useMotionValue, useTransform, type Variants } from "motion/react";
import { useEffect, useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Comp>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
};
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export function Stagger({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/** Splits text into words that rise from a mask, one after another. */
export function SplitText({
  text,
  className,
  delay = 0,
  wordClassName,
}: {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  // The trigger lives on the outer span: the words start fully clipped by their
  // masks, so observing them directly would never report them as visible.
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delayChildren: delay, staggerChildren: 0.07 }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden="true">
          <motion.span
            className={"inline-block " + (wordClassName ?? "")}
            variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1, ease } } }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Counter({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("en-IN") + suffix);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, mv, to]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
