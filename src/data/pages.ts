import type { LegalPage } from "@/lib/types";

export const pages: LegalPage[] = [
  {
    slug: "safety",
    title: "Safety Guidelines",
    subtitle: "Your safety is our priority. Please read these guidelines carefully.",
    updated: "October 2026",
    sections: [
      {
        id: "commitment",
        heading: "Our Unwavering Commitment to Safety",
        paragraphs: [
          "Welcome to MyBirBilling! Paragliding is an exhilarating adventure, and our mission is to provide this experience in the safest possible environment. These guidelines are essential for a smooth, enjoyable and secure flight.",
        ],
        note: "Your pilot is in command of the flight. It is crucial that you listen to and follow all of their instructions at all times.",
      },
      {
        id: "health",
        heading: "Health & Fitness Requirements",
        paragraphs: ["To ensure your safety and comfort, certain physical conditions must be met:"],
        items: [
          { label: "Weight Limit", text: "Tandem paragliding has a weight limit of 25 kg to 90 kg. This is for aerodynamic safety and cannot be negotiated." },
          { label: "Physical Fitness", text: "You should be able to walk and run a few steps during the take-off phase." },
          { label: "Medical Conditions", text: "Inform our team beforehand if you have serious medical conditions (heart problems, epilepsy, recent surgery, high blood pressure) or are pregnant. Please consult your doctor before booking." },
        ],
      },
      {
        id: "preparation",
        heading: "Preparing for Your Flight",
        items: [
          { label: "Sturdy Shoes", text: "Sports or trekking shoes are mandatory." },
          { label: "Comfortable Clothes", text: "Wear a t-shirt and full-length pants. A jacket is recommended." },
          { label: "Sun Protection", text: "Sunglasses and sunscreen." },
          { label: "Avoid", text: "Slippers, sandals or high heels; skirts, sarees or loose clothing." },
          { label: "Alcohol / Drugs", text: "Flying under the influence is strictly prohibited." },
        ],
      },
      {
        id: "during-flight",
        heading: "During the Flight",
        paragraphs: ["Your main job is to relax and enjoy the incredible views! Just remember these key points:"],
        items: [
          { label: "Listen Carefully", text: "Pay close attention to the pre-flight briefing. This is the most important step for your safety." },
          { label: "Stay Seated", text: "Remain comfortably seated in your harness. Do not adjust any straps or equipment." },
          { label: "Landing Position", text: "Before landing, your pilot will ask you to lift your legs. Follow this precisely for a soft, safe landing." },
          { label: "Communicate", text: "If you feel nauseous or uncomfortable, tell your pilot immediately. They can adjust for a gentler ride." },
        ],
      },
      {
        id: "equipment",
        heading: "Equipment & Pilot Expertise",
        items: [
          { label: "Certified Equipment", text: "Internationally certified (EN/DHV rated) gliders, harnesses and reserve parachutes that undergo regular safety checks." },
          { label: "Expert Pilots", text: "Licensed pilots with thousands of hours of flight experience and expert knowledge of Bir Billing's local conditions." },
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Booking & Privacy Policy",
    subtitle: "How bookings work and how we handle your information.",
    updated: "October 2026",
    intro:
      "Thank you for choosing MyBirBilling for your paragliding adventure! We are committed to a seamless and transparent booking experience. Please read our policies carefully before making a booking.",
    sections: [
      {
        id: "booking",
        heading: "Booking Process",
        paragraphs: ["You can book your paragliding slot through the following methods:"],
        items: [
          { label: "Online Booking", text: "Visit our website, select your desired package and complete the booking process." },
          { label: "Phone / WhatsApp", text: "Contact us at +91 97366 96260 to confirm your slot." },
        ],
        note: "A booking is confirmed only after we receive the advance or full payment. You will receive a confirmation message from our team.",
      },
      {
        id: "information",
        heading: "Your Information",
        paragraphs: [
          "We collect only the details needed to manage your booking — your name, phone number, email and flight preferences. We never sell or share your information with third parties for marketing.",
        ],
      },
      {
        id: "weather",
        heading: "Weather Conditions",
        paragraphs: ["Paragliding is weather-dependent and your safety is our priority. If a flight is cancelled by our team due to weather or safety reasons:"],
        items: [
          { label: "Reschedule", text: "We will try to reschedule your flight for the next available slot." },
          { label: "Refund", text: "If you cannot reschedule, you will receive a 100% refund for the paragliding portion of your booking." },
        ],
        note: "All refunds are processed within 5-7 working days to the original mode of payment.",
      },
      {
        id: "requirements",
        heading: "Participant Requirements",
        items: [
          { label: "Age", text: "Minors require parental consent." },
          { label: "Weight", text: "Limits depend on the package and may vary with weather conditions." },
          { label: "Health", text: "Participants must not have serious medical conditions like heart problems, epilepsy or recent major surgery." },
        ],
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Cancellation & Refund Policy",
    subtitle: "Plans change — our policy is designed to be fair and flexible.",
    updated: "October 2026",
    intro:
      "At MyBirBilling, we understand that plans can change. Our cancellation policy is as flexible and fair as possible while accounting for the operational planning required for a safe paragliding experience.",
    sections: [
      {
        id: "timeframes",
        heading: "Cancellation Timeframes & Refunds",
        paragraphs: ["Refunds are based on the time of cancellation before your scheduled flight:"],
        items: [
          { label: "Full Refund (100%)", text: "If you cancel more than 48 hours (2 days) before your scheduled flight." },
          { label: "Partial Refund (50%)", text: "If you cancel between 24 and 48 hours before your scheduled flight." },
          { label: "No Refund", text: "If you cancel less than 24 hours before your flight, or in case of a no-show." },
        ],
        note: "All refunds are processed to the original mode of payment and may take 5-7 business days to reflect.",
      },
      {
        id: "weather",
        heading: "Weather & Safety Cancellations",
        paragraphs: [
          "Paragliding is highly dependent on weather. MyBirBilling reserves the right to cancel or reschedule any flight due to bad weather (rain, high winds, poor visibility) or other safety concerns. In such cases you can choose:",
        ],
        items: [
          { label: "Reschedule", text: "Choose another available date and time at no extra cost." },
          { label: "Full Refund", text: "If you can't reschedule, we provide a 100% refund of your booking amount." },
        ],
      },
      {
        id: "how",
        heading: "How to Request a Cancellation",
        paragraphs: [
          "The fastest way is to call us or message us on WhatsApp. Please keep your Booking ID or registered phone number ready. You can also email us with your booking details and reason for cancellation.",
        ],
      },
    ],
  },
  {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    subtitle: "Safety first — please read carefully before your flight.",
    updated: "October 2026",
    sections: [
      {
        id: "commitment",
        heading: "Our Commitment to Safety",
        paragraphs: [
          "At MyBirBilling, safety isn't just a guideline; it's the foundation of every flight. We adhere strictly to the regulations set by local authorities like the Himachal Pradesh Tourism Department.",
        ],
        note: "Your pilot is in command. Always listen to and follow the instructions of your pilot.",
      },
      {
        id: "pilot-equipment",
        heading: "Your Pilot & Equipment",
        items: [
          { label: "Certified Pilots", text: "All pilots are licensed and experienced with Himalayan weather and Bir Billing's wind conditions." },
          { label: "Certified Equipment", text: "Internationally certified (EN/DHV rated) gliders, harnesses and reserve parachutes." },
          { label: "Rigorous Maintenance", text: "All equipment undergoes mandatory pre-flight checks and regular maintenance." },
          { label: "Safety Gear", text: "You will be provided with a well-fitted helmet and a secure harness." },
        ],
      },
      {
        id: "health-fitness",
        heading: "Health & Fitness Requirements",
        items: [
          { label: "Weight Limit", text: "The permissible weight range is 25 kg to 90 kg — crucial for aerodynamic safety." },
          { label: "Physical Fitness", text: "You must be able to walk and run a few steps during take-off and landing." },
          { label: "High Altitude", text: "The take-off site is at ~2400m. Tell us if you have respiratory issues or have had altitude sickness." },
          { label: "Medical Conditions", text: "Consult a doctor before flying if you are pregnant or have heart ailments, epilepsy or recent major surgery." },
        ],
      },
      {
        id: "flight-prep",
        heading: "Preparing for Your Flight",
        items: [
          { label: "Sturdy Shoes", text: "Closed-toe trekking or sports shoes are mandatory." },
          { label: "Comfortable Clothes", text: "Trousers and a T-shirt. A windproof jacket is highly recommended, even on sunny days." },
          { label: "Sun Protection", text: "Sunglasses and sunscreen are essential." },
          { label: "Intoxication", text: "Flying under the influence of alcohol or drugs is forbidden and results in cancellation without refund." },
        ],
      },
      {
        id: "flight-conduct",
        heading: "During the Flight",
        items: [
          { label: "Attend the Briefing", text: "Pay close attention to the pre-flight safety briefing. Don't hesitate to ask questions." },
          { label: "Follow Commands", text: "Your full cooperation during take-off and landing is crucial for safety." },
          { label: "Secure Personal Items", text: "Cameras and phones must be strapped to you. We are not responsible for lost or damaged items." },
          { label: "Communicate", text: "If you feel sick or uncomfortable at any point, tell your pilot immediately." },
        ],
      },
      {
        id: "site-rules",
        heading: "General Site Rules",
        items: [
          { label: "Designated Areas", text: "Remain within marked spectator areas at take-off and landing sites." },
          { label: "Landing Zone", text: "The landing zone at Chaugan can be busy. Be aware of pilots who are landing." },
          { label: "Supervise Children", text: "Keep a close watch on children, especially near equipment and operational areas." },
        ],
      },
    ],
  },
];
