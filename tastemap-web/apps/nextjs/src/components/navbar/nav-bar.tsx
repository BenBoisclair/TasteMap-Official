/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

import { cn } from "~/utils/cn";
import LogInButton from "../auth/log-in-button";
import TasteMapFullLogo from "../icons/taste-map-logo-full";
import { SideMenuSignedIn } from "./side-menu-signed-in";

export function NavBar({ className = "" }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <nav
        className={cn(
          ` fixed top-0 z-[200] flex w-full items-center bg-white px-5 py-3.5`,
          className,
        )}
      >
        <button onClick={() => toggleMenu()} className="cursor-pointer">
          <Menu size={30} />
        </button>
        <div className=" flex grow justify-center pr-10">
          <TasteMapFullLogo />
        </div>
        {/* <div className="flex gap-4">
          <Search size={30} />
          <Heart size={30} />
        </div> */}
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
          `fixed left-0 top-0 z-[200] h-screen w-[300px] bg-white duration-500 ease-in-out`,
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
          <div className="flex h-full px-5 pb-5">
            <SignedOut>
              <div className="flex h-full flex-col items-center">
                <span className="mb-2 font-medium">
                  Join us in supporting local Tourism!
                </span>
                <LogInButton />
                <Link
                  href={`/`}
                  className="mt-5 w-full border-b-2 border-neutral py-5"
                >
                  <span className="text-xl font-bold">Home</span>
                </Link>
                <div className="flex w-full flex-col gap-4 border-b-2 border-neutral py-5 text-xl font-bold">
                  <span>Language</span>
                  <span>FAQs</span>
                  <span>Report issues</span>
                </div>
                <div className="flow-col flex w-full grow items-end justify-center">
                  <Image
                    src={`/mascot/TastyBoiSurprised.png`}
                    alt="TastyBoi!"
                    width={200}
                    height={300}
                  />
                </div>
              </div>
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
