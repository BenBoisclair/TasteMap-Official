"use client";
import { cn } from "@/utils/cn";
import { ArrowLeft } from "lucide-react";
import TasteMapFullLogo from "../icons/taste-map-logo-full";

export default function NavbarBack({ className }: { className?: string }) {
  return (
    <>
      <nav
        className={cn(
          ` fixed top-0 z-[200] flex w-full items-center bg-white px-5 py-3.5`,
          className
        )}>
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer">
          <ArrowLeft size={30} />
        </button>
        <div className="grow flex justify-center pr-10">
          <TasteMapFullLogo />
        </div>
      </nav>
    </>
  );
}
