import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";

import ttnorms from "~/fonts/ttnorms";

import "~/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Head from "next/head";
import { headers } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { cn } from "~/utils/cn";
import { Providers } from "./providers";
import { tastemapJsonld } from "./jsonLd";
import Hotjar from "~/components/hotjar";
import GoogleAnalytics from "~/utils/google-analytics";

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
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(tastemapJsonld) }}
          />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <Hotjar />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        {/* {process.env.NEXT_PUBLIC_GTM_ID ? (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        ) : null} */}
        <body className={cn(ttnorms.className, "text-neutral-800 antialiased")}>
          <Providers headers={headers()}>
            {props.children}
            <Analytics />
            <SpeedInsights />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
