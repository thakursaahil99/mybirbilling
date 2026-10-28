import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/forms/BookingWizard";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Book Your Flight",
  description: "Book tandem paragliding or a paragliding course in Bir Billing in a few quick steps.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Secure your slot"
        title="Book your"
        highlight="flight"
        subtitle="Pick your experience, choose a date and we'll take care of the rest."
        video="/uploads/media/compressed_bir.mp4"
        photos={["/uploads/media/compressed_g11.jpeg", "/uploads/media/compressed_g25.jpeg", "/uploads/media/compressed_g13.jpeg"]}
        crumbs={[{ label: "Book" }]}
      />
      <section className="relative z-10 -mt-10 pb-24">
        <div className="container-x">
          <Suspense fallback={<div className="card h-96 animate-pulse" />}>
            <BookingWizard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
