import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";

import ttnorms from "~/fonts/ttnorms";

import "~/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Head from "next/head";
import { headers } from "next/headers";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { cn } from "~/utils/cn";
import GoogleAnalytics from "../components/google-analytics";
import { Providers } from "./providers";

export const viewport: Viewport = {
  themeColor: "#FFD14E",
};

export const metadata: Metadata = {
  title: "TasteMap | Explore Local",
  description: "Platform for Local Tourism!",
  applicationName: "TasteMap",
  keywords: [
    "Tourism",
    "Map",
    "Food",
    "Markets",
    "Thailand",
    "Bangkok",
    "Fashion",
    "Local Tourism",
    "Taling Chan Floating Market",
    "Floating Market",
    "Night Market",
    "Flea Market",
  ],
  creator: "Benedict Boisclair",
  publisher: "The Hominians Co.,Ltd.",
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
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
            rel="stylesheet"
          />
          {/* Hotjar Tracking Code for taste-map.com */}
        </Head>
        <Script
          id="HotJarAnalytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3627500,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
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
