/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Heart, Menu, Search, X } from "lucide-react";

import { cn } from "~/utils/cn";
import LogInButton from "./log-in-button";
import { SideMenuSignedIn } from "./side-menu-signed-in";

export function NavBar({ className = "" }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <nav
        className={cn(
          `sticky top-0 z-30 flex items-center justify-between bg-white px-5 py-4`,
          className,
        )}
      >
        <button onClick={() => toggleMenu()} className="cursor-pointer">
          <Menu size={30} />
        </button>
        <div className="flex gap-4">
          <Search size={30} />
          <Heart size={30} />
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
              "z-40": isMenuOpen,
              "-z-40 hidden": !isMenuOpen,
            },
          )}
        />
      )}
    </>
  );
}

export const SideMenu = ({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}) => {
  return (
    <>
      <div
        className={cn(
          `fixed left-0 top-0 z-50 h-screen w-[300px] bg-white duration-500 ease-in-out`,
          {
            "left-[0%]": isMenuOpen,
            "left-[-100%]": !isMenuOpen,
          },
        )}
      >
        <div className="h-full w-full">
          <div className="flex cursor-pointer  justify-end p-4">
            <X size={28} onClick={() => toggleMenu()} />
          </div>
          <div className="px-5 pb-5">
            <SignedOut>
              <LogInButton />
            </SignedOut>
            <SignedIn>
              <SideMenuSignedIn />
            </SignedIn>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
