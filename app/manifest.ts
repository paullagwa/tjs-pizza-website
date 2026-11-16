import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "TJ's Pizza",
    description:
      "Wholesale pizza bases and hand-stretched dough balls from the NSW Central Coast.",
    start_url: "/",
    display: "browser",
    background_color: "#0f0d07",
    theme_color: "#0f0d07",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
