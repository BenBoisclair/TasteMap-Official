"use client";
import { cn } from "@/utils/cn";
import { ArrowLeft } from "lucide-react";
import TasteMapFullLogo from "../icons/taste-map-logo-full";
import BackButton from "../back-button";

export default function NavbarBack({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <>
      <nav
        className={cn(
          ` fixed top-0 z-[200] flex w-full items-center bg-white px-5 py-3.5`,
          className
        )}>
        <BackButton />
        {!title ? (
          <div className="grow flex justify-center pr-10">
            <TasteMapFullLogo />
          </div>
        ) : (
          <div className="grow text-xl font-bold">{title}</div>
        )}
      </nav>
    </>
  );
}
