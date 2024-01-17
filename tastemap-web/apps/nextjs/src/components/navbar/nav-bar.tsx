"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search } from "lucide-react";

import { cn } from "~/utils/cn";
import TasteMapFullLogo from "../icons/taste-map-logo-full";
import SideMenu from "./sidebar-menu";

export function NavBar({
  className = "",
  page = "Home",
  marketId,
}: {
  className?: string;
  page?: "Home" | "Vendor" | "Market";
  marketId?: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <>
      <nav
        className={cn(
          ` fixed top-0 z-[200] flex w-full items-center bg-white px-5 py-3.5`,
          className
        )}
      >
        <button onClick={() => toggleMenu()} className="cursor-pointer">
          <Menu size={30} />
        </button>
        <div className=" flex grow justify-center pr-10">
          <TasteMapFullLogo />
        </div>
        <div className="flex gap-4 items-center">
          {page !== "Vendor" && (
            <Link
              href={
                page === "Home" ? `/vendors` : `/market/${marketId}/vendors`
              }
            >
              <Search size={28} />
            </Link>
          )}
          <Link href="/profile/favourites">
            <Heart strokeWidth={2} size={28} />
          </Link>
        </div>
      </nav>
      <SideMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      {/* Dark Background Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => toggleMenu()}
          className={cn(
            `fixed top-0 h-screen w-full bg-black/30 duration-500 ease-in-out`,
            {
              "z-[150]": isMenuOpen,
              "-z-40 hidden": !isMenuOpen,
            }
          )}
        />
      )}
    </>
  );
}

export default NavBar;
