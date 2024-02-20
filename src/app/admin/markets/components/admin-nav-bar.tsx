"use client";
import { Home, Store } from "lucide-react";
import TasteMapFullLogo from "@/components/icons/taste-map-logo-full";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import Link from "next/link";

const PAGES = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/admin",
  },
  {
    name: "Markets",
    icon: Store,
    href: "/admin/markets",
  },
];

export default function AdminNavBar() {
  const pathName = usePathname();
  return (
    <nav className="w-56 bg-stone-600 flex sticky top-0 h-screen flex-col p-2 text-white">
      <div className="flex justify-center py-2">
        <TasteMapFullLogo />
      </div>
      <ul className="gap-2 flex flex-col">
        {PAGES.map((page) => (
          <Link
            href={page.href}
            key={page.name}
            className={cn(
              "px-4 flex items-center gap-2 py-2 hover:text-stone-300 cursor-pointer hover:bg-stone-500/50 rounded-lg",
              {
                "bg-stone-500": pathName.endsWith(page.href),
              }
            )}>
            {page.icon && <page.icon size={16} />}
            <span className="font-medium">{page.name}</span>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
