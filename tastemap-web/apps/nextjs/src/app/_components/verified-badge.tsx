import Image from "next/image";

import { cn } from "~/utils/cn";

const VerifiedBadge = ({
  toggleBorder = true,
  size = "md",
}: {
  toggleBorder?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <>
      <div
        className={cn(
          ` flex items-center gap-1 rounded-3xl bg-white py-0.5 pl-1 pr-2 text-green`,
          {
            "border-2": toggleBorder,
          },
        )}
      >
        <div
          className={cn(
            `relative h-[16px] w-[16px] overflow-hidden rounded-full bg-green`,
            {
              "h-[14px] w-[14px]": size === "sm",
              "h-[16px] w-[16px]": size === "md",
              "h-[20px] w-[20px]": size === "lg",
            },
          )}
        >
          <Image
            src="/mascot/TastyBoiGreeting.png"
            alt={"TastyBoi Verified"}
            fill={true}
            style={{
              objectFit: "contain",
              transform: "translate(-1px, 2px) rotate(30deg)",
            }}
          />
        </div>
        <p
          className={cn(`font-medium`, {
            "text-[10px]": size === "sm",
            "text-[12px]": size === "md",
            "text-[14px]": size === "lg",
          })}
        >
          Partner
        </p>
      </div>
    </>
  );
};

export default VerifiedBadge;
