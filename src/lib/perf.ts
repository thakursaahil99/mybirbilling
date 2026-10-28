"use client";

import { useSyncExternalStore } from "react";
import { LITE_KEY } from "./lite-script";

// "Lite mode" drops GPU-heavy effects (backdrop blur, big blur blobs, grain,
// smooth scroll, custom cursor, autoplaying card videos) on low-end machines.
// It is switched on by LITE_SCRIPT before first paint, or later by PerfProbe
// when the page measurably drops frames, and remembered for the next visit.

const EVENT = "mbb:lite";

export function isLite() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("lite");
}

export function enableLite() {
  if (isLite()) return;
  document.documentElement.classList.add("lite");
  try {
    localStorage.setItem(LITE_KEY, "1");
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function useLite() {
  return useSyncExternalStore(subscribe, isLite, () => false);
}
