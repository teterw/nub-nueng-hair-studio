import type { Metadata, Viewport } from "next";
import { Anuphan, Trirong } from "next/font/google";
import { shop } from "@/data/shop";
import "./globals.css";

/**
 * Trirong — display only. A Thai serif whose thick/thin modulation echoes the
 * brush line of the logo, where a heavier signage face just shouts. One weight
 * is loaded on purpose: it sets the shop name and the section titles, nothing
 * else, so there is no second weight to keep in step.
 */
const trirong = Trirong({
  weight: "600",
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-trirong",
});

/**
 * Anuphan — body. A modern humanist Thai sans that stays clean at 15–16px on a
 * phone, and is far less of a default on Thai sites than Sarabun.
 */
const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-anuphan",
});

// TODO: real data — set to the final domain once the site is live.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nub-nueng-hair-studio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: shop.seo.title,
  description: shop.seo.description,
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: shop.name,
    title: shop.seo.title,
    description: shop.seo.description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `โลโก้${shop.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: shop.seo.title,
    description: shop.seo.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f2e8df",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${trirong.variable} ${anuphan.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
