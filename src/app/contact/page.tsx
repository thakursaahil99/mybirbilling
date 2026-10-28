import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactBody } from "@/components/sections/ContactBody";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact MyBirBilling to book tandem paragliding or courses in Bir Billing. Call or WhatsApp +91 97366 96260.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We're here to help"
        title="Get in"
        highlight="touch"
        subtitle="Have questions or ready to book? We'll help you plan the perfect paragliding experience."
        video="/uploads/media/compressed_bir2.mp4"
        photos={["/uploads/media/compressed_g3.jpeg", "/uploads/media/compressed_g25.jpeg", "/uploads/media/compressed_g18.jpeg"]}
        crumbs={[{ label: "Contact" }]}
      />
      <ContactBody />
      <CtaBanner title="Don't wait, fly today" text="Book your tandem flight adventure — call us or chat on WhatsApp for instant confirmation." />
    </>
  );
}
