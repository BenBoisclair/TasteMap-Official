import { ReactNode, Suspense } from "react";

export function HomePageHeader({ children }: { children: ReactNode }) {
  return (
    <div className="mt-12 w-full rounded-b-3xl bg-white py-5">{children}</div>
  );
}
