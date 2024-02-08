import React from "react";
import { usePathname } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

function LogInButton() {
  const pathname = usePathname();
  return (
    <SignInButton afterSignInUrl={pathname} afterSignUpUrl={pathname}>
      <button id="Log in" className="w-full rounded-3xl bg-yellow py-2">
        <span className="text-xl font-bold">Log in</span>
      </button>
    </SignInButton>
  );
}

export default LogInButton;
