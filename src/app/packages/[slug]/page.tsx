import type { Metadata } from "next";
import { PackageDetail } from "@/components/package/PackageDetail";
import { packages } from "@/data/packages";

export const dynamicParams = false;

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = packages.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — ₹${p.price.toLocaleString("en-IN")}`,
    description: p.summary,
    openGraph: { images: [p.image] },
  };
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PackageDetail slug={slug} />;
}
