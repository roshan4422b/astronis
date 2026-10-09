export type Testimonial = {
  id: string;
  name: string;
  company: string;
  designation?: string;
  service: string;
  quote?: string;
  rating?: number;
  videoUrl?: string;
  duration?: string;
  publicationConsent: boolean;
  status: "pending-review" | "approved";
};

// Add only approved records with the client's publication consent.
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-001",
    name: "Ananya Mehta",
    company: "Northstar Manufacturing Pvt. Ltd.",
    designation: "Chief Executive Officer",
    service: "Corporate & Commercial Advisory",
    quote: "Astronis Global brought clarity and commercial focus to a complex restructuring exercise. Their advice was practical, timely and easy for our leadership team to act on.",
    rating: 5,
    publicationConsent: true,
    status: "approved",
  },
  {
    id: "testimonial-002",
    name: "Rohan Kapoor",
    company: "Vertex Digital Solutions",
    designation: "Founder & Managing Director",
    service: "Regulatory Services",
    quote: "The team understood our regulatory requirements quickly and helped us move forward with confidence. We valued their responsiveness and disciplined follow-through.",
    rating: 4,
    publicationConsent: true,
    status: "approved",
  },
  {
    id: "testimonial-003",
    name: "Priya Nair",
    company: "Meridian Healthcare Group",
    designation: "General Counsel",
    service: "Licensing & Registrations",
    quote: "Astronis Global provided dependable support across multiple registrations and approvals. Their communication was clear, structured and consistently professional.",
    rating: 5,
    publicationConsent: true,
    status: "approved",
  },
  {
    id: "testimonial-004",
    name: "Vikram Shah",
    company: "Arclight Infrastructure Ventures",
    designation: "Director, Projects",
    service: "Infrastructure & Regulatory Advisory",
    quote: "Their team helped us navigate a demanding approval process with a strong understanding of both the legal detail and the commercial priorities behind the project.",
    rating: 4,
    publicationConsent: true,
    status: "approved",
  },
  {
    id: "testimonial-005",
    name: "Neha Bansal",
    company: "Crestline Consumer Brands",
    designation: "Head of Strategy",
    service: "IPR & Other Registrations",
    quote: "We received thoughtful, business-friendly guidance on protecting our brand portfolio. The advice was precise and helped our internal teams make decisions efficiently.",
    rating: 3,
    publicationConsent: true,
    status: "approved",
  },
  {
    id: "testimonial-006",
    name: "Arjun Malhotra",
    company: "Summit Global Trade LLP",
    designation: "Partner",
    service: "FEMA & Foreign Exchange Advisory",
    quote: "Astronis Global gave us a well-organised roadmap for a cross-border transaction and remained available throughout implementation. Their guidance was measured and dependable.",
    rating: 5,
    publicationConsent: true,
    status: "approved",
  },
];
