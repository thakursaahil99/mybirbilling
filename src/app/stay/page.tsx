import type { Metadata } from "next";
import { Suspense } from "react";
import { TripBuilder } from "@/components/forms/TripBuilder";
import { PageHero } from "@/components/layout/PageHero";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { RoomShowcase } from "@/components/sections/RoomShowcase";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Stay & Trip Packages",
  description: "Bunks, rooms and deluxe camps in Bir Billing. Build your own package with paragliding, stay, meals and scooty — save 10% on combos.",
};

export default function StayPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay With Us"
        title="Fly by day,"
        highlight="rest by night"
        subtitle="Cosy bunks, private rooms and deluxe camps — then bundle your flight, stay, meals and scooty into one package and save 10%."
        image="https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=2000"
        photos={[
          "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=800",
          "/uploads/media/compressed_g17.jpg",
        ]}
        crumbs={[{ label: "Stay" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#plan" size="lg" icon="arrow-right">
            Build My Trip
          </Button>
          <Button href="#rooms" size="lg" variant="ghost-light">
            See Rooms
          </Button>
        </div>
      </PageHero>
      <div id="rooms">
        <RoomShowcase />
      </div>
      <section id="plan" className="scroll-mt-20 bg-sand/60 py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Build Your Own Package"
            title="Fly + Stay + Food,"
            highlight="your way"
            subtitle="Mix a flight or course with a stay, meals and a scooty. Watch the price update live — combos get 10% OFF automatically."
          />
          <div className="mt-14">
            <Suspense fallback={<div className="card h-96 animate-pulse" />}>
              <TripBuilder />
            </Suspense>
          </div>
        </div>
      </section>
      <EnquirySection source="stay" />
    </>
  );
}
