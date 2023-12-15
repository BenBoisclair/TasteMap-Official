import Image from "next/image";

import { cn } from "~/utils/cn";

const VerifiedBadge = ({ toggleBorder = true }: { toggleBorder?: boolean }) => {
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
        <div className=" relative h-[16px] w-[16px] overflow-hidden rounded-full bg-green">
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
        <p className="text-[12px] font-medium">Verified</p>
      </div>
    </>
  );
};

export default VerifiedBadge;
