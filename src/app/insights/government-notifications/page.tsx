import GovernmentNotificationsLanding from "./government-notifications-page";

export const metadata = {
  title: "Government Notifications",
  description:
    "Latest government notifications, circulars, orders and policy updates from Central and State Governments.",
  alternates: {
    canonical: "/insights/government-notifications",
  },
};

export default function GovernmentNotificationsPage() {
  return <GovernmentNotificationsLanding />;
}
