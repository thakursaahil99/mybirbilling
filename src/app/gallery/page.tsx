import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/layout/PageHero";
import { CommunitySection } from "@/components/sections/CommunitySection";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Paragliding videos and photos from Bir Billing — real flights and real smiles from MyBirBilling flyers.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Captured in the sky"
        title="BirBilling"
        highlight="Gallery"
        subtitle="Thrilling paragliding moments from Bir Billing — straight from our pilots' GoPros."
        video="/uploads/media/v5_compressed.mp4"
        photos={["/uploads/media/compressed_g10.jpeg", "/uploads/media/compressed_g6.jpg", "/uploads/media/compressed_g24.jpeg"]}
        crumbs={[{ label: "Gallery" }]}
      />
      <GalleryGrid />
      <CommunitySection />
    </>
  );
}
