import React from "react";
import { SignOutButton } from "@clerk/nextjs";

function LogOutButton() {
  return (
    <SignOutButton>
      <button
        id="Sign Out"
        className="w-full cursor-pointer rounded-3xl border-2 border-black py-2"
      >
        <span className="text-xl font-bold">Log out</span>
      </button>
    </SignOutButton>
  );
}

export default LogOutButton;
