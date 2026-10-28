import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { PackageRows } from "@/components/sections/PackageRows";
import { RentalGrid } from "@/components/sections/RentalGrid";
import { WhyUs } from "@/components/sections/WhyUs";

const services = {
  "tandem-flights": {
    title: "Tandem",
    highlight: "Paragliding Flights",
    eyebrow: "No experience needed",
    subtitle: "Fly side-by-side with a certified pilot from the 2400m Billing take-off. Choose 15 minutes of fun or an hour of cross-country soaring.",
    video: "/uploads/media/v6_compressed.mp4",
    photos: ["/uploads/media/compressed_g10.jpeg", "/uploads/media/compressed_g13.jpeg", "/uploads/media/compressed_g3.jpeg"],
    description: "Tandem paragliding flights in Bir Billing — Joy Ride, Classic and Cross Country with certified pilots and GoPro video.",
  },
  "training-courses": {
    title: "Become a",
    highlight: "Certified Pilot",
    eyebrow: "P1 → P4 Certification",
    subtitle: "A clear path from your first ground-handling lesson to independent cross-country flying — with BPA-recognised certification.",
    video: "/uploads/media/compressed_p3hero.mp4",
    photos: ["/uploads/media/compressed_g5.jpg", "/uploads/media/compressed_g4.jpeg", "/uploads/media/compressed_g6.jpg"],
    description: "Paragliding training courses in Bir Billing: P1+P2 basics, P3 thermal flying and P4 cross-country expedition.",
  },
  "equipment-rental": {
    title: "Equipment",
    highlight: "Rental Service",
    eyebrow: "For certified pilots",
    subtitle: "Professional, certified paragliding equipment available by the day — wings, harnesses, helmets, varios and radios.",
    video: "/uploads/media/compressed_bir6.mp4",
    photos: ["/uploads/media/compressed_g18.jpeg", "/uploads/media/compressed_g9.jpeg", "/uploads/media/compressed_g23.jpeg"],
    description: "Rent certified paragliding equipment in Bir Billing: EN-B wings, harnesses with reserve, helmets, GPS varios and radios.",
  },
} as const;

type Slug = keyof typeof services;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services[slug as Slug];
  return { title: `${s.title} ${s.highlight}`, description: s.description };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = (await params) as { slug: Slug };
  const s = services[slug];
  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.title}
        highlight={s.highlight}
        subtitle={s.subtitle}
        video={s.video}
        photos={[...s.photos]}
        crumbs={[{ label: "Services" }, { label: `${s.title} ${s.highlight}` }]}
      />
      {slug === "equipment-rental" ? <RentalGrid /> : <PackageRows category={slug === "tandem-flights" ? "tandem" : "course"} />}
      {slug !== "equipment-rental" && <WhyUs />}
      <CtaBanner />
      <EnquirySection source={`service:${slug}`} />
    </>
  );
}
