import React from "react";
import { SignInButton } from "@clerk/nextjs";

function LogInButton() {
  return (
    <SignInButton>
      <button className="w-full rounded-3xl bg-yellow py-2">
        <span className="text-xl font-bold">Connect</span>
      </button>
    </SignInButton>
  );
}

export default LogInButton;
