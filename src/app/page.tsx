import { AboutSection } from "@/components/sections/AboutSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { FlightPath } from "@/components/sections/FlightPath";
import { Hero } from "@/components/sections/Hero";
import { MomentsSection } from "@/components/sections/MomentsSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { PhotoWall } from "@/components/sections/PhotoWall";
import { PilotsSection } from "@/components/sections/PilotsSection";
import { StaysSection } from "@/components/sections/StaysSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";
import { FlyingGlider } from "@/components/ui/Effects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="relative">
        <FlyingGlider className="top-10" />
        <PackagesSection />
      </div>
      <WhyUs />
      <AboutSection />
      <FlightPath />
      <PilotsSection limit={4} />
      <PhotoWall />
      <MomentsSection />
      <StaysSection />
      <CommunitySection />
      <Testimonials />
      <EnquirySection />
    </>
  );
}
