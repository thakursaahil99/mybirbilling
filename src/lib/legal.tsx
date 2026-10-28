import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { LegalContent } from "@/components/sections/LegalContent";
import { pages } from "@/data/pages";

export function legalMetadata(slug: string): Metadata {
  const p = pages.find((x) => x.slug === slug)!;
  return { title: p.title, description: p.subtitle };
}

export function LegalPage({ slug }: { slug: string }) {
  const p = pages.find((x) => x.slug === slug)!;
  return (
    <>
      <PageHero eyebrow="MyBirBilling" title={p.title} subtitle={p.subtitle} image="/uploads/media/compressed_g9.jpeg" crumbs={[{ label: p.title }]} />
      <LegalContent slug={slug} />
    </>
  );
}
