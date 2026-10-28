export type NavItem = { label: string; href: string; children?: { label: string; href: string; desc: string; icon: string }[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages/" },
  {
    label: "Services",
    href: "/services/tandem-flights/",
    children: [
      { label: "Tandem Flights", href: "/services/tandem-flights/", desc: "Fly with a pro, no experience needed", icon: "parachute" },
      { label: "Training Courses", href: "/services/training-courses/", desc: "P1 to P4 certification programs", icon: "graduation" },
      { label: "Equipment Rental", href: "/services/equipment-rental/", desc: "Certified gear for pilots", icon: "shield" },
      { label: "Stay & Trip Builder", href: "/stay/", desc: "Rooms, camps & custom packages", icon: "tent" },
    ],
  },
  { label: "Stay", href: "/stay/" },
  { label: "Pilots", href: "/pilots/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/terms-conditions/" },
  { label: "Cancellation Policy", href: "/refund-policy/" },
  { label: "Safety Guidelines", href: "/safety/" },
];
