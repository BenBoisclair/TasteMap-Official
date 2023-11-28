import type { ReactNode } from "react";

import type { Tag } from "~/data/testData";
import { cn } from "~/utils/cn";

export function Tag({
  type,
  size = "default",
  children,
}: {
  type: string;
  size?: "default" | "lg";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(` flex items-center rounded-3xl`, {
        "bg-yellow": type === "Product",
        "bg-gray": type === "Facility",
        "px-2 py-[2px]": size === "default",
        "px-2 py-1": size === "lg",
      })}
    >
      <span
        className={cn(`whitespace-nowrap font-medium`, {
          "text-yellow-600": type === "Product",
          "text-[#7C7C7C]": type === "Facility",
          "text-xs": size === "default",
          "text-sm": size === "lg",
        })}
      >
        {children}
      </span>
    </div>
  );
}
