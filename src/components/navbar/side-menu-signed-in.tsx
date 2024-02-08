import { SignedIn } from "@clerk/nextjs";
import { ReactNode } from "react";

export const SideMenuSignedIn = ({ children }: { children: ReactNode }) => {
  return (
    <SignedIn>
      <div className="flex h-full flex-col">{children}</div>
    </SignedIn>
  );
};
