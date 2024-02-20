import AdminNavBar from "./markets/components/admin-nav-bar";
import { cn } from "@/utils/cn";
import { currentUser, useUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metadata = await currentUser();
  if (!metadata || metadata.publicMetadata.role !== "Admin") {
    return <div>Whoops!</div>;
  }
  return (
    <div className={cn("antialiased flex", inter.className)}>
      <AdminNavBar />
      <div className="w-full bg-stone-600">
        <div className=" bg-neutral-800 mt-4 rounded-tl-3xl px-8 py-8 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
