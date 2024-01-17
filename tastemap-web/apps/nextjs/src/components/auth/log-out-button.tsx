import React from "react";
import { SignOutButton } from "@clerk/nextjs";
import { cn } from "~/utils/cn";

function LogOutButton({ className }: { className?: string }) {
  return (
    <SignOutButton>
      <button
        id="Sign Out"
        className={cn(
          `w-full cursor-pointer rounded-3xl border-2 border-black py-2`,
          className
        )}
      >
        <span className="text-xl font-bold">Log out</span>
      </button>
    </SignOutButton>
  );
}

export default LogOutButton;
