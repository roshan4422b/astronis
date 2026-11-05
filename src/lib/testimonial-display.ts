export function getHomepageTestimonials<
  TPublished extends { id: string },
  TFallback extends { id: string },
>(
  publishedNewestFirst: readonly TPublished[],
  existingTestimonials: readonly TFallback[],
  suppressedSourceIds: ReadonlySet<string>,
  limit = 6,
): (TPublished | TFallback)[] {
  const publishedIds = new Set(publishedNewestFirst.map((testimonial) => testimonial.id));
  const fallback = existingTestimonials.filter(
    (testimonial) =>
      !publishedIds.has(testimonial.id) && !suppressedSourceIds.has(testimonial.id),
  );
  return [...publishedNewestFirst, ...fallback].slice(0, limit);
}
