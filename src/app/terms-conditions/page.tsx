import { LegalPage, legalMetadata } from "@/lib/legal";

export const metadata = legalMetadata("terms-conditions");

export default function Page() {
  return <LegalPage slug="terms-conditions" />;
}
