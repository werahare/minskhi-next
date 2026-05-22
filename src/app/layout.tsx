import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Minskhi | Rare Gemstones and Bespoke Jewellery",
    template: "%s | Minskhi"
  },
  description:
    "Minskhi is a luxury gemstone and jewellery house offering rare coloured gemstones, bespoke jewellery consultations, and enquiry-led collecting.",
  openGraph: {
    siteName: "Minskhi",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
