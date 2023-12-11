import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import ttnorms from "~/fonts/ttnorms";

import "~/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Head from "next/head";
import { headers } from "next/headers";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "~/utils/cn";
import { Providers } from "./providers";

// const fontSans = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TasteMap",
  description: "Platform for Local Tourism!",
  // openGraph: {
  //   title: "Create T3 Turbo",
  //   description: "Simple monorepo with shared backend for web & mobile apps",
  //   url: "https://create-t3-turbo.vercel.app",
  //   siteName: "Create T3 Turbo",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@jullerino",
  //   creator: "@jullerino",
  // },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          {/* Browser Color */}
          <meta name="theme-color" content="#FFD14E" />
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
        <body className={cn(ttnorms.className, "text-neutral-800 antialiased")}>
          <Providers headers={headers()}>
            {props.children}
            <Analytics />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
