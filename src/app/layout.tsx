import type { Metadata } from "next";
import Header from "./_components/header";
import Footer from "./_components/footer";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.astronisglobal.com"),
  title: {
    default: "Astronis Global | Corporate, Regulatory & Business Advisory",
    template: "%s | Astronis Global",
  },
  description:
    "Strategic legal, regulatory and business advisory solutions. Pan-India presence and global perspective to navigate complexity, mitigate risk and accelerate growth.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
