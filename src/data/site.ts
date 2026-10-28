import type { Extra, Partner, RentalItem, Settings, Stay, Testimonial } from "@/lib/types";

export const settings: Settings = {
  brand: "MyBirBilling",
  tagline: "Ready to Fly",
  description:
    "Experience thrilling paragliding with certified instructors in Bir Billing, Himachal Pradesh — the world's 2nd best paragliding site.",
  phonePrimary: "+91 97366 96260",
  phoneSecondary: "+91 98821 25039",
  whatsapp: "919736696260",
  email: "mybirbillingfly@gmail.com",
  address: "2PJC+WC2, Bir Road, Railway Crossing, near Ahju, Himachal Pradesh 175032",
  mapUrl: "https://maps.google.com/?q=2PJC%2BWC2+Bir+Himachal+Pradesh",
  hours: "Mon – Sun: 9:00 AM – 6:00 PM",
  season: "Season Active",
  logo: "/uploads/media/logo.jpg",
  heroVideo: "/uploads/media/hero-video-compressed.mp4",
  hero: {
    eyebrow: "Bir Billing · Himachal Pradesh",
    title: ["Ready", "to Fly"],
    subtitle:
      "Experience the thrill of paragliding from 2400m at Bir Billing — the world's 2nd best flying site.",
    badges: ["Professional Pilots", "15–60 min Flights", "GoPro Video", "P1–P4 Courses"],
  },
  socials: [
    { name: "instagram", url: "https://www.instagram.com/mybirbilling/", followers: "57K+" },
    { name: "youtube", url: "https://www.youtube.com/@mybirbilling", followers: "25K+" },
    { name: "facebook", url: "https://www.facebook.com/share/r/1GsZJGxFCj/", followers: "11K+" },
  ],
  stats: [
    { value: "World's 2nd", label: "Best Flying Site", icon: "globe" },
    { value: "2400m", label: "Take-off Height", icon: "mountain" },
    { value: "30+ Min", label: "Flight Time", icon: "clock" },
    { value: "300+ Days", label: "Flying Weather", icon: "sun" },
    { value: "Certified", label: "Expert Pilots", icon: "shield" },
    { value: "GoPro", label: "Flight Videos", icon: "camera" },
  ],
  about: {
    since: "2010",
    title: "About Our Journey",
    text: "MyBirBilling started with a passion for flying and a dream to share the incredible experience of paragliding with the world. Operating at Bir Billing — ranked 2nd globally for paragliding — we've completed over 10,000 successful flights with zero compromise on safety.",
    counters: [
      { value: 10, suffix: "K+", label: "Happy Flyers" },
      { value: 15, suffix: "+", label: "Years Experience" },
      { value: 100, suffix: "%", label: "Safety Record" },
    ],
  },
  stayOffer: "Get 10% OFF when you book a course & stay together!",
  comboDiscount: 10,
};

const px = (id: number, w = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Verma",
    city: "Delhi",
    rating: 5,
    text: "The entire team was incredible! From booking to the actual flight, everything was smooth and professional. They ensured our safety at all times. Truly an unforgettable experience.",
  },
  {
    id: 2,
    name: "Priya Patel",
    city: "Mumbai",
    rating: 5,
    text: "Best adventure company I've ever dealt with! The equipment quality was top-notch, the stay was comfortable, and the food exceeded expectations. They really know how to make an adventure memorable.",
  },
  {
    id: 3,
    name: "Amit Sharma",
    city: "Bangalore",
    rating: 5,
    text: "Professional service from start to finish. The attention to detail and customer care was exceptional. They made my first paragliding experience absolutely amazing. Would recommend to everyone!",
  },
  {
    id: 4,
    name: "Neha Singh",
    city: "Pune",
    rating: 5,
    text: "Outstanding experience! The instructors were patient and encouraging, making sure everyone in our group felt comfortable. The views were spectacular and the entire journey was well organised.",
  },
  {
    id: 5,
    name: "Vikram Rao",
    city: "Hyderabad",
    rating: 5,
    text: "Exceeded all expectations! The team's expertise and friendly approach made this adventure truly special. Everything was perfectly planned and executed. Can't wait to book my next trip.",
  },
];

export const partners: Partner[] = [
  { id: 1, name: "Freestays Villa", tagline: "Luxury & Comfort" },
  { id: 2, name: "H2H River Swiss Camps", tagline: "Riverside Glamping" },
  { id: 3, name: "Moonshine Villa", tagline: "Panoramic Views" },
  { id: 4, name: "Bir Blues Homestay", tagline: "Cozy & Authentic" },
  { id: 5, name: "Prakriti Yoga Studio", tagline: "Wellness & Serenity" },
  { id: 6, name: "Chokling Arthouse Hotel", tagline: "Artistic & Unique Stay" },
  { id: 7, name: "Landing Pad Cafe", tagline: "Great Food & Views" },
];

export const stays: Stay[] = [
  {
    id: 1,
    slug: "bunks",
    title: "Bunks",
    tagline: "Backpacker favourite",
    description:
      "Clean, cosy dorm beds with privacy curtains — perfect for solo flyers and course students who want to meet fellow pilots.",
    price: 499,
    pricing: "person",
    capacity: 1,
    image: px(7061730),
    images: [px(7061730), px(2029722), px(271624)],
    amenities: ["Privacy curtains", "Personal locker", "Hot water", "Wi-Fi", "Common lounge"],
  },
  {
    id: 2,
    slug: "double-room",
    title: "Double Room",
    tagline: "Comfort for two",
    description:
      "A private double room with attached bathroom, a short ride from the landing site. Ideal for couples and friends.",
    price: 1500,
    pricing: "room",
    capacity: 2,
    image: px(164595),
    images: [px(164595), px(271618), px(1743229)],
    amenities: ["Attached bathroom", "Double bed", "Hot water", "Wi-Fi", "Mountain view"],
    popular: true,
  },
  {
    id: 3,
    slug: "deluxe-camps",
    title: "Deluxe Camps",
    tagline: "Sleep under the stars",
    description:
      "Swiss-style glamping tents with real beds, set amidst nature — wake up to Himalayan sunrises and bonfire nights.",
    price: 2500,
    pricing: "room",
    capacity: 2,
    image: px(2398220),
    images: [px(2398220), px(4825701), px(2526025), px(1061640)],
    amenities: ["Bonfire", "Attached washroom", "Valley view", "Camp dining", "Music nights"],
  },
  {
    id: 4,
    slug: "premium-room",
    title: "Premium Room",
    tagline: "Luxury & views",
    description:
      "Spacious premium rooms with elegant interiors and panoramic Dhauladhar views for the ultimate relaxing stay after your flight.",
    price: 3000,
    pricing: "room",
    capacity: 3,
    image: px(279746),
    images: [px(279746), px(262048), px(1838554), px(6585757)],
    amenities: ["King bed", "Balcony", "Room service", "Wi-Fi", "Panoramic view"],
  },
];

export const extras: Extra[] = [
  { id: 1, title: "Meals", description: "Fresh home-style meals — breakfast, lunch or dinner", price: 149, unit: "meal", icon: "sun" },
  { id: 2, title: "Scooty Rental", description: "Explore Bir, monasteries & cafés at your own pace", price: 599, unit: "day", icon: "wind" },
];

export const rentals: RentalItem[] = [
  { id: 1, title: "Paraglider Wing", description: "EN-B certified wings · All sizes", price: 2000, available: false },
  { id: 2, title: "Safety Harness", description: "With reserve parachute · All sizes", price: 800, available: false },
  { id: 3, title: "Safety Helmet", description: "EN966 certified · Radio compatible", price: 300, available: false },
  { id: 4, title: "Variometer GPS", description: "With GPS tracking · Audio alerts", price: 500, available: false },
  { id: 5, title: "Two-Way Radio", description: "Long range · Emergency button", price: 200, available: false },
  {
    id: 6,
    title: "Complete Package",
    description: "Wing + Harness + Helmet + Radio + GPS",
    price: 3500,
    available: false,
    bestValue: true,
    note: "Save ₹300!",
  },
];
