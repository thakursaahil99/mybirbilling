import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { WhyUs } from "@/components/sections/WhyUs";

export const metadata: Metadata = {
  title: "Paragliding Packages",
  description: "Tandem joy rides, classic & cross-country flights and P1–P4 paragliding courses in Bir Billing. Compare prices and book online.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="A Taste of Freedom"
        title="Soar through the skies of"
        highlight="Bir Billing"
        subtitle="Your adventure of a lifetime awaits. Pick a tandem flight or start your journey to becoming a pilot."
        video="/uploads/media/hero-video-compressed.mp4"
        photos={["/uploads/media/compressed_g11.jpeg", "/uploads/media/compressed_g13.jpeg", "/uploads/media/compressed_g3.jpeg"]}
        crumbs={[{ label: "Packages" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#packages" size="lg" icon="arrow-right">
            View Packages
          </Button>
          <Button href="/contact/" size="lg" variant="ghost-light" icon="arrow-up-right">
            Quick Inquiry
          </Button>
        </div>
      </PageHero>
      <PackagesSection showAllLink={false} heading={{ eyebrow: "View Our Packages", title: "Expertly curated", highlight: "flying experiences" }} />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
