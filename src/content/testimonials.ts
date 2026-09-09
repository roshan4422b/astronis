export type Testimonial = {
  id: string;
  name: string;
  company: string;
  designation?: string;
  service: string;
  quote?: string;
  videoUrl?: string;
  duration?: string;
  publicationConsent: boolean;
  status: "pending-review" | "approved";
};

// Add only approved records with the client's publication consent.
export const testimonials: Testimonial[] = [];
