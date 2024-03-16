import type { Metadata, Viewport } from "next";

import ttnorms from "@/fonts/ttnorms";

import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/utils/cn";
import { Providers } from "./providers";
import Hotjar from "@/components/external/hotjar";
import Unami from "@/components/external/unami";
import Mapbox from "@/components/external/mapbox";
import TasteMapJsonD from "@/metadata/taste-map";

export const viewport: Viewport = {
  themeColor: "#FFD14E",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://taste-map.com"),
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
  openGraph: {
    images: "/opengraph-image.png",
  },
};

const Head = () => {
  return (
    <head>
      <TasteMapJsonD />
      <Mapbox />
      <Unami />
      <Hotjar />
    </head>
  );
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head />
        <body className={cn(ttnorms.className, "text-neutral-800 antialiased")}>
          <Providers>{props.children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
