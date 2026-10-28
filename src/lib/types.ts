// Shapes shared with the PHP API. Every collection here will be admin-managed.

export type Feature = { label: string; tag: string };
export type DetailItem = { title: string; text?: string };
export type DetailGroup = { title: string; items: DetailItem[] };
export type Faq = { q: string; a: string };
export type Perk = { title: string; text: string };

export type Package = {
  id: number;
  slug: string;
  title: string;
  category: "tandem" | "course";
  level: string;
  duration: string;
  price: number;
  advance: number;
  priceUnit: string;
  cardVideo: string;
  heroVideos: string[];
  image: string;
  summary: string;
  tagline: string;
  heroTitle: [string, string];
  heroBadges: string[];
  intro: {
    title: string;
    highlight: string;
    subtitle: string;
    heading: string;
    text: string;
    features: Feature[];
  };
  details: {
    badge: string;
    title: string;
    subtitle: string;
    heading: string;
    groups: DetailGroup[];
  };
  cta: { title: string; subtitle: string; points: string[]; perks: Perk[] };
  faqs: Faq[];
  whatsappText: string;
  popular?: boolean;
  active: boolean;
  order: number;
};

export type Pilot = {
  id: number;
  name: string;
  role: string;
  badge: string;
  rating: number;
  experience: number;
  flights: string;
  location: string;
  status: "online" | "busy";
  images: string[];
  instagram?: string;
  order: number;
};

export type GalleryItem = {
  id: number;
  type: "photo" | "video";
  src: string;
  title: string;
  featured?: boolean;
};

export type Testimonial = {
  id: number;
  name: string;
  city: string;
  text: string;
  rating: number;
};

export type Partner = { id: number; name: string; tagline: string };

export type Stay = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  /** "person": price is per guest per night (dorm beds); "room": per room per night. */
  pricing: "person" | "room";
  capacity: number;
  image: string;
  images: string[];
  amenities: string[];
  popular?: boolean;
};

export type Extra = {
  id: number;
  title: string;
  description: string;
  price: number;
  /** How the quantity is counted in the trip builder. */
  unit: "meal" | "day" | "trip";
  icon: string;
};

export type RentalItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  available: boolean;
  bestValue?: boolean;
  note?: string;
};

export type Stat = { value: string; label: string; icon: string };

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: { label: string; text: string }[];
  note?: string;
};

export type LegalPage = {
  slug: string;
  title: string;
  subtitle: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
};

export type Settings = {
  brand: string;
  tagline: string;
  description: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsapp: string;
  email: string;
  address: string;
  mapUrl: string;
  hours: string;
  season: string;
  logo: string;
  heroVideo: string;
  hero: { eyebrow: string; title: [string, string]; subtitle: string; badges: string[] };
  socials: { name: "instagram" | "youtube" | "facebook"; url: string; followers: string }[];
  stats: Stat[];
  about: {
    since: string;
    title: string;
    text: string;
    counters: { value: number; suffix: string; label: string }[];
  };
  stayOffer: string;
  /** Percent off the whole trip when a flight/course is combined with a stay. */
  comboDiscount: number;
};

export type SiteData = {
  settings: Settings;
  packages: Package[];
  pilots: Pilot[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  partners: Partner[];
  stays: Stay[];
  extras: Extra[];
  rentals: RentalItem[];
  pages: LegalPage[];
};
