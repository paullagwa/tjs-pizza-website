import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import FornoWidget from "@/components/FornoWidget";
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
  title: "Wholesale Pizza Bases & Dough Balls NSW | TJ's Pizza Products",
  description:
    "HACCP-certified wholesale pizza bases and hand-stretched dough balls from the NSW Central Coast. No preservatives, no soy, no milk. Australian family-owned since 2002. Delivered nationally via PFD Food Services.",
  // STAGING GUARD — the rebuild must not be indexed until DNS cutover.
  // Cutover checklist (Phase 6): remove this block and set metadataBase +
  // canonical to https://tjspizzaproducts.com.au.
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
        {children}
        <FornoWidget />
      </body>
    </html>
  );
}
