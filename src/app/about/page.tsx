import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { AboutValues } from "@/components/sections/AboutValues";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PilotsSection } from "@/components/sections/PilotsSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description: "MyBirBilling — world-class paragliding in Bir Billing since 2010. Safety-first operations, certified pilots and 10,000+ happy flyers.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MyBirBilling"
        title="Where your adventure"
        highlight="takes flight"
        subtitle="Your premier destination for world-class paragliding in the breathtaking landscapes of Bir Billing — the paragliding capital of India."
        video="/uploads/media/compressed_hero-final.mp4"
        photos={["/uploads/media/compressed_g17.jpg", "/uploads/media/compressed_g4.jpeg", "/uploads/media/compressed_g12.jpeg"]}
        crumbs={[{ label: "About" }]}
      >
        <Button href="/packages/" size="lg" icon="arrow-up-right">
          Discover Our Packages
        </Button>
      </PageHero>
      <AboutValues />
      <AboutSection />
      <PilotsSection limit={4} />
      <Testimonials />
      <CtaBanner title="Ready to write your sky story?" text="Your adventure of a lifetime is just a click away. Let's make it happen." />
    </>
  );
}
