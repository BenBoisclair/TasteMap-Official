"use client";
import { cn } from "@/utils/cn";

export function MarketStatusIcon({ status }: { status: "OPEN" | "CLOSED" }) {
  return (
    <div
      className={cn(` flex items-center rounded-3xl px-[6px] py-[3px] w-fit`, {
        "bg-green": status === "OPEN",
        "bg-orange": status === "CLOSED",
      })}>
      <span className="text-xs font-bold text-white">{status}</span>
    </div>
  );
}
