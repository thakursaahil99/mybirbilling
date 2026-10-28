import type { GalleryItem, Pilot } from "@/lib/types";

const M = "/uploads/media/";

export const pilots: Pilot[] = [
  {
    id: 1,
    name: "Chamel Thakur",
    role: "Tandem Flight Expert & Owner",
    badge: "Tandem Master Pilot",
    rating: 4.9,
    experience: 11,
    flights: "5.0K+",
    location: "Bir, Himachal Pradesh",
    status: "online",
    images: [M + "compressed_g5.jpg", M + "compressed_g7.jpeg", M + "compressed_g3.jpeg"],
    instagram: "https://www.instagram.com/chamel_my_bir_billing",
    order: 1,
  },
  {
    id: 2,
    name: "Gulshan Thakur",
    role: "Acrobatics Instructor",
    badge: "Acrobatics Pilot",
    rating: 4.8,
    experience: 7,
    flights: "3.5K+",
    location: "Bir, Himachal Pradesh",
    status: "online",
    images: [M + "gulshan.jpg"],
    order: 2,
  },
  {
    id: 3,
    name: "Subham Bhangalia",
    role: "Cross-Country Guide",
    badge: "Cross-Country Pilot",
    rating: 4.7,
    experience: 6,
    flights: "2.5K+",
    location: "Bir, Himachal Pradesh",
    status: "busy",
    images: [M + "shubham1.png", M + "shubham2.png"],
    order: 3,
  },
  {
    id: 4,
    name: "Suresh Thakur",
    role: "First-Time Flyer Expert",
    badge: "First-Time Flyer Pilot",
    rating: 4.6,
    experience: 6,
    flights: "2.1K+",
    location: "Bir, Himachal Pradesh",
    status: "online",
    images: [M + "suresh5.png", M + "suresh4.png"],
    order: 4,
  },
];

const videos = [
  "v4_compressed.mp4",
  "v5_compressed.mp4",
  "v6_compressed.mp4",
  "v7_compressed.mp4",
  "p3hero.mp4",
  "compressed_hero-final.mp4",
  "compressed_bir.mp4",
  "compressed_bir2.mp4",
  "compressed_bir3.mp4",
  "compressed_bir4.mp4",
  "compressed_bir5.mp4",
  "compressed_bir6.mp4",
  "compressed_bir7.mp4",
  "compressed_bir8.mp4",
  "v1_compressed.mp4",
];

const photos = [
  "compressed_g3.jpeg",
  "compressed_g4.jpeg",
  "compressed_g5.jpg",
  "compressed_g6.jpg",
  "compressed_g7.jpeg",
  "compressed_g9.jpeg",
  "compressed_g10.jpeg",
  "compressed_g11.jpeg",
  "compressed_g12.jpeg",
  "compressed_g13.jpeg",
  "compressed_g14.jpeg",
  "compressed_g15.jpg",
  "compressed_g17.jpg",
  "compressed_g18.jpeg",
  "compressed_g23.jpeg",
  "compressed_g24.jpeg",
  "compressed_g25.jpeg",
];

const featured = new Set(["compressed_bir2.mp4", "v4_compressed.mp4", "compressed_bir7.mp4", "compressed_bir8.mp4", "compressed_g17.jpg", "compressed_g5.jpg", "compressed_g3.jpeg", "compressed_g7.jpeg"]);

export const gallery: GalleryItem[] = [
  ...videos.map((f, i) => ({ id: i + 1, type: "video" as const, src: M + f, title: "Flight over Bir Billing", featured: featured.has(f) })),
  ...photos.map((f, i) => ({ id: 100 + i, type: "photo" as const, src: M + f, title: "Moments in the sky", featured: featured.has(f) })),
];
