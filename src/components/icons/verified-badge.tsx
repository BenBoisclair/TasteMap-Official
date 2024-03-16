import Image from "next/image";

import { cn } from "@/utils/cn";

const VerifiedBadge = ({
  toggleBorder = false,
  size = "md",
  variant = "default",
  className,
}: {
  toggleBorder?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "icon";
  className?: string;
}) => {
  const defaultVariant = (
    <div
      className={cn(
        ` flex items-center gap-1 rounded-3xl bg-white py-0.5 pl-1 pr-2 text-green w-fit`,
        {
          "border-2": toggleBorder,
        },
        className
      )}>
      <div
        className={cn(
          `relative h-[16px] w-[16px] overflow-hidden rounded-full bg-green`,
          {
            "h-[14px] w-[14px]": size === "sm",
            "h-[16px] w-[16px]": size === "md",
            "h-[20px] w-[20px]": size === "lg",
          }
        )}>
        <Image
          src="/mascot/TastyBoiGreeting.png"
          alt={"TastyBoi Verified"}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "contain",
            transform: "translate(-1px, 2px) rotate(30deg)",
          }}
        />
      </div>
      <div
        className={cn(`font-medium`, {
          "text-[10px]": size === "sm",
          "text-[12px]": size === "md",
          "text-[14px]": size === "lg",
        })}>
        Verified
      </div>
    </div>
  );

  const iconVariant = (
    <>
      <div
        className={cn(
          ` flex items-center gap-1 rounded-3xl bg-white px-0.5 py-0.5 text-green`,
          {
            "border-2": toggleBorder,
          }
        )}>
        <div
          className={cn(
            `relative h-[16px] w-[16px] overflow-hidden rounded-full bg-green`,
            {
              "h-[14px] w-[14px]": size === "sm",
              "h-[16px] w-[16px]": size === "md",
              "h-[20px] w-[20px]": size === "lg",
            }
          )}>
          <Image
            src="/mascot/TastyBoiGreeting.png"
            alt={"TastyBoi Verified"}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "contain",
              transform: "translate(-1px, 2px) rotate(30deg)",
            }}
          />
        </div>
      </div>
    </>
  );

  return <div>{variant === "default" ? defaultVariant : iconVariant}</div>;
};

export default VerifiedBadge;
