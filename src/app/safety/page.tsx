import { LegalPage, legalMetadata } from "@/lib/legal";

export const metadata = legalMetadata("safety");

export default function Page() {
  return <LegalPage slug="safety" />;
}
