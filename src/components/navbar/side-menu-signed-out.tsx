import { SignedOut } from "@clerk/nextjs";
import { ReactNode } from "react";

export const SideMenuSignedOut = ({ children }: { children: ReactNode }) => {
  return (
    <SignedOut>
      <div className="flex h-full flex-col">{children}</div>
    </SignedOut>
  );
};
