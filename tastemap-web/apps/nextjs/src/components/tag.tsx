"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import type { Tag } from "~/types/types";
import { cn } from "~/utils/cn";

export function Tag({
  type,
  size = "default",
  onClick,
  children,
}: {
  type: string;
  size?: "default" | "lg" | "sm";
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <Link href={`/vendors?category=${children}`} replace={true}>
      <div
        className={cn(` flex items-center rounded-3xl`, {
          "bg-yellow": type === "Product",
          "bg-neutral-200": type === "Facility",
          "px-2 py-[2px]": size === "default",
          "px-2 py-1": size === "lg",
          "px-1 py-0.5": size === "sm",
        })}
      >
        <div
          className={cn(`whitespace-nowrap font-medium`, {
            "text-yellow-600": type === "Product",
            "text-[#7C7C7C]": type === "Facility",
            "text-xs": size === "default",
            "text-sm": size === "lg",
            " text-3xs": size === "sm",
          })}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}
