import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { PerfProbe } from "@/components/providers/PerfProbe";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor, ScrollProgress } from "@/components/ui/Effects";
import { seed } from "@/data";
import { LITE_SCRIPT } from "@/lib/lite-script";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mybirbilling.com"),
  title: {
    default: "MyBirBilling — Paragliding in Bir Billing | Tandem Flights & P1–P4 Courses",
    template: "%s | MyBirBilling",
  },
  description:
    "Book tandem paragliding and certified P1–P4 courses in Bir Billing, Himachal Pradesh — the world's 2nd best paragliding site. Certified pilots, GoPro videos, 2400m take-off.",
  keywords: ["Bir Billing paragliding", "tandem paragliding Bir", "paragliding course India", "P1 P2 paragliding course", "Billing take off"],
  openGraph: {
    type: "website",
    siteName: "MyBirBilling",
    images: ["/uploads/media/compressed_g17.jpg"],
  },
  icons: { icon: "/uploads/media/logo.jpg", apple: "/uploads/media/logo.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#0a0f24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // LITE_SCRIPT may add the "lite" class before hydration.
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LITE_SCRIPT }} />
      </head>
      <body>
        <SiteProvider initial={seed}>
          <Preloader />
          <PerfProbe />
          <SmoothScroll />
          <ScrollProgress />
          <Cursor />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <BottomNav />
          <WhatsAppFab />
        </SiteProvider>
      </body>
    </html>
  );
}
