import { corporateArticles } from "./corporate-articles";

export type MediaEntry = {
  id: string;
  type: "Videos" | "Podcasts" | "Blogs";
  title: string;
  description: string;
  image: string;
  href?: string;
  youtubeId?: string;
};

// Add the channel URL and published YouTube video IDs here when available.
// Entries with a youtubeId open the inline player; blog entries use href.
export const youtubeChannelUrl: string | null = null;
export const featuredMedia: MediaEntry = {
  id: "featured-conversation",
  type: "Videos",
  title: "Big ideas. Clear perspectives.",
  description: "Conversations on business, law and the opportunities ahead.",
  image: "/Part-14 .png",
};

export const homeMedia: MediaEntry[] = [
  {
    id: "video-series",
    type: "Videos",
    title: "A fresh perspective on business",
    description: "Our video series is coming soon. Explore ideas that bring complex business questions into focus.",
    image: "/Part-18 .png",
  },
  {
    id: "podcast-series",
    type: "Podcasts",
    title: "Conversations worth your time",
    description: "Our podcast series is coming soon. A space for thoughtful conversations and new perspectives.",
    image: "/Part-9 .png",
  },
  ...corporateArticles.slice(0, 2).map((article): MediaEntry => ({
    id: article.slug,
    type: "Blogs",
    title: article.title,
    description: article.excerpt,
    image: article.image,
    href: `/insights/${article.slug}`,
  })),
];
