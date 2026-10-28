import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PilotsSection } from "@/components/sections/PilotsSection";
import { PilotStats } from "@/components/sections/PilotStats";

export const metadata: Metadata = {
  title: "Our Pilots",
  description: "Meet the certified tandem pilots and instructors of MyBirBilling — thousands of safe flights over Bir Billing.",
};

export default function PilotsPage() {
  return (
    <>
      <PageHero
        eyebrow="Your Safety & Experience is our Priority"
        title="Expert paragliding"
        highlight="pilots"
        subtitle="Certified, experienced and multi-lingual instructors who know every thermal over the Dhauladhars."
        video="/uploads/media/v7_compressed.mp4"
        photos={["/uploads/media/compressed_g5.jpg", "/uploads/media/gulshan.jpg", "/uploads/media/suresh5.png"]}
        crumbs={[{ label: "Pilots" }]}
      />
      <PilotStats />
      <PilotsSection showAll={false} />
      <CommunitySection />
      <CtaBanner title="Fly with the best in Bir" />
    </>
  );
}
