import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import FornoWidget from "@/components/FornoWidget";
import JsonLd from "@/components/JsonLd";
import MobileActionBar from "@/components/MobileActionBar";
import { OG_IMAGE, SITE_NAME, SITE_URL, siteGraph } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Wholesale Pizza Bases & Dough Balls NSW | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "HACCP-certified wholesale pizza bases and hand-stretched dough balls from the NSW Central Coast. No preservatives, no soy, no milk. Australian family-owned since 2002. Delivered nationally via PFD Food Services.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `Wholesale Pizza Bases & Dough Balls NSW | ${SITE_NAME}`,
    description:
      "HACCP-certified wholesale pizza bases and hand-stretched dough balls from the NSW Central Coast. Australian family-owned since 2002.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  // STAGING GUARD — the rebuild must not be indexed until DNS cutover.
  // Cutover checklist (see CUTOVER.md, Phase 6): delete this robots block.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0f0d07",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${playfair.variable} ${jakarta.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-green-deep focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd data={siteGraph()} />
        {children}
        <MobileActionBar />
        <FornoWidget />
      </body>
    </html>
  );
}
