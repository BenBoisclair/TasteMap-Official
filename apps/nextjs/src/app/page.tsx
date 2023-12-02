// import { Suspense } from "react";
// import { HomePageHeader } from "./_components/homepage-header";
import { MarketsNearYouSection } from "./_components/markets-near-you-section";
import NavBar from "./_components/nav-bar";

export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="flex h-screen w-full flex-col bg-neutral">
      <NavBar />
      {/* <HomePageHeader /> */}
      <MarketsNearYouSection />
    </main>
  );
}
