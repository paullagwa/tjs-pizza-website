import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import FornoWidget from "@/components/FornoWidget";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, siteGraph } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
    images: [{ url: "/images/TJs-Pizza-Products-15-scaled.jpg", width: 1200, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  // STAGING GUARD — the rebuild must not be indexed until DNS cutover.
  // Cutover checklist (see CUTOVER.md, Phase 6): delete this robots block.
  robots: { index: false, follow: false },
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
        <JsonLd data={siteGraph()} />
        {children}
        <FornoWidget />
      </body>
    </html>
  );
}
