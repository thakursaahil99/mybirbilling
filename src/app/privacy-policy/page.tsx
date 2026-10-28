import { LegalPage, legalMetadata } from "@/lib/legal";

export const metadata = legalMetadata("privacy-policy");

export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
