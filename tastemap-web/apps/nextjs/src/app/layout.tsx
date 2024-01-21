import type { Metadata, Viewport } from "next";

import ttnorms from "~/fonts/ttnorms";

import "~/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "~/utils/cn";
import { Providers } from "./providers";
import { tastemapJsonld } from "./jsonLd";
import Hotjar from "~/components/hotjar";
import Script from "next/script";
import PlausibleProvider from "next-plausible";

export const viewport: Viewport = {
  themeColor: "#FFD14E",
};

export const metadata: Metadata = {
  title: {
    template: "%s | TasteMap",
    default: "TasteMap",
  },
  description: "Platform for Local Tourism!",
  keywords: ["Tourism", "Asia", "Food", "Markets", "Vendors"],
  creator: "The Hominians Co.,Ltd.",
  authors: [
    {
      name: "The Hominians Co.,Ltd.",
      url: "https://www.instagram.com/thehominians/",
    },
    {
      name: "Benedict Boisclair",
      url: "https://www.linkedin.com/in/benedict-boisclair-971958169/",
    },
  ],
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <Script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(tastemapJsonld) }}
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
            rel="stylesheet"
          />
          {process.env.NODE_ENV === "production" && (
            <Script
              defer
              src="https://eu.umami.is/script.js"
              data-website-id="fa03eb8d-13e4-469d-b119-386ed291ac64"
            />
          )}
          <PlausibleProvider domain="taste-map.com" />
        </head>
        <Hotjar />
        <body className={cn(ttnorms.className, "text-neutral-800 antialiased")}>
          <Providers>{props.children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
