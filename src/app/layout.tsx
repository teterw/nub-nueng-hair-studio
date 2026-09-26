import type { Metadata, Viewport } from "next";
import {
  Anuphan,
  Charm,
  IBM_Plex_Sans_Thai,
  Kanit,
  Mitr,
  Noto_Sans_Thai,
  Pridi,
  Trirong,
} from "next/font/google";
import { defaultTheme, themeStorageKey, themes } from "@/data/themes";
import { shop } from "@/data/shop";
import "./globals.css";

/**
 * One typeface pairing per style. Each exposes a CSS variable, and the
 * [data-theme] blocks in globals.css decide which pair is live.
 *
 * Only the default style's two faces are preloaded. The rest are declared with
 * `preload: false`, so the browser fetches a face when a style actually uses it
 * rather than pulling nine families down on first paint. Once the owner picks a
 * style, delete the others here and the page drops to two faces again.
 */

/* วินเทจ — a Thai serif whose thick/thin modulation is the move the logo makes
   with a brush line. */
const trirong = Trirong({
  weight: "600",
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-trirong",
});

/* Body for วินเทจ, ละมุน and บูทีค — humanist, clean at 15–16px on a phone. */
const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-anuphan",
});

/* มินิมอล sets both roles from one neutral grotesque; กลางคืน borrows it for body. */
const plexThai = IBM_Plex_Sans_Thai({
  weight: ["400", "600"],
  subsets: ["thai", "latin"],
  display: "swap",
  preload: false,
  variable: "--font-plex-thai",
});

/* กลางคืน — calligraphic, and the one place it belongs: gold on near-black. */
const charm = Charm({
  weight: "700",
  subsets: ["thai", "latin"],
  display: "swap",
  preload: false,
  variable: "--font-charm",
});

/* ละมุน — rounded geometric, the friendliest face of the six. */
const mitr = Mitr({
  weight: "500",
  subsets: ["thai", "latin"],
  display: "swap",
  preload: false,
  variable: "--font-mitr",
});

/* สตูดิโอ — confident and a little condensed. */
const kanit = Kanit({
  weight: "500",
  subsets: ["thai", "latin"],
  display: "swap",
  preload: false,
  variable: "--font-kanit",
});

/* Body for สตูดิโอ — plainer than Anuphan, which suits the harder display face. */
const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  display: "swap",
  preload: false,
  variable: "--font-noto-thai",
});

/* บูทีค — a softer serif than Trirong: less brush stroke, more printed page. */
const pridi = Pridi({
  weight: "500",
  subsets: ["thai", "latin"],
  display: "swap",
  preload: false,
  variable: "--font-pridi",
});

const fontVariables = [
  trirong.variable,
  anuphan.variable,
  plexThai.variable,
  charm.variable,
  mitr.variable,
  kanit.variable,
  notoThai.variable,
  pridi.variable,
].join(" ");

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

/**
 * Applies the saved style before the first paint, so reloading on a dark style
 * never flashes a cream page. Runs from `?style=` first, which is what makes a
 * link like `…/?style=night` shareable — hand the owner six links instead of
 * asking them to find the picker.
 *
 * Kept as a string and inlined on purpose: a React effect would run after
 * paint, which is exactly the flash this avoids.
 */
const themeInitScript = `
(function () {
  try {
    var ids = ${JSON.stringify(themes.map((t) => t.id))};
    var fromUrl = new URLSearchParams(location.search).get("style");
    var saved = localStorage.getItem(${JSON.stringify(themeStorageKey)});
    var pick = ids.indexOf(fromUrl) > -1 ? fromUrl : (ids.indexOf(saved) > -1 ? saved : ${JSON.stringify(defaultTheme)});
    document.documentElement.setAttribute("data-theme", pick);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", ${JSON.stringify(defaultTheme)});
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" data-theme={defaultTheme} className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
