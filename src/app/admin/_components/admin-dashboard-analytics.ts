export type DatedRecord = { date: string };
export type InsightCategoryRecord = { category: string; status: string };

export function getEnquiryTrend(enquiries: readonly DatedRecord[], now = new Date()) {
  const firstMonth = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1);
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5 + index, 1));
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      label: new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(date),
      count: 0,
    };
  });

  for (const enquiry of enquiries) {
    const date = new Date(enquiry.date);
    if (Number.isNaN(date.getTime()) || date.getTime() < firstMonth) continue;
    const month = months.find((item) => item.year === date.getUTCFullYear() && item.month === date.getUTCMonth());
    if (month) month.count += 1;
  }

  return months;
}

export function getPublishedInsightCategories(insights: readonly InsightCategoryRecord[]) {
  const counts = new Map<string, number>();
  for (const insight of insights) {
    if (insight.status !== "Published") continue;
    const category = insight.category.trim() || "Uncategorised";
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category));
}
