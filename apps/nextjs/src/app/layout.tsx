import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import ttnorms from "~/fonts/ttnorms";

import "~/styles/globals.css";

import { headers } from "next/headers";
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
