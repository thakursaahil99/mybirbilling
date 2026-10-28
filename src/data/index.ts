import type { SiteData } from "@/lib/types";
import { packages } from "./packages";
import { pages } from "./pages";
import { gallery, pilots } from "./pilots";
import { extras, partners, rentals, settings, stays, testimonials } from "./site";

// Seed content baked into the static build. Once the PHP API is live,
// SiteProvider refreshes this from /api/site so admin edits show without a rebuild.
export const seed: SiteData = {
  settings,
  packages,
  pilots,
  gallery,
  testimonials,
  partners,
  stays,
  extras,
  rentals,
  pages,
};
