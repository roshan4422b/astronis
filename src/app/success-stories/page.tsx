import { Banner } from "../_components/ui";
import SuccessStories from "../home/success-stories";
export const metadata = { title: "Success Stories" };
export default function StoriesPage() {
  return (
    <>
      <Banner
        title="Real Challenges. Strategic Solutions."
        text="Explore how Astronis Global supports businesses through legal, regulatory and strategic challenges."
        image="/Part-16 .png"
        eyebrow="Success Stories"
      />
      <SuccessStories />
    </>
  );
}
