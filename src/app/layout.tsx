import type { Metadata, Viewport } from "next";
import { Anuphan, Chonburi } from "next/font/google";
import { shop } from "@/data/shop";
import "./globals.css";

/**
 * Chonburi — display only. A Thai face drawn from vintage shop-sign lettering,
 * with the thick/thin stroke contrast that echoes the brush line in the logo.
 * Single weight (400), so it is used sparingly: the shop name and section titles.
 */
const chonburi = Chonburi({
  weight: "400",
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-chonburi",
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
    <html lang="th" className={`${chonburi.variable} ${anuphan.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
