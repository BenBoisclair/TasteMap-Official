import { cn } from "@/utils/cn";
import Image from "next/image";

interface ImageFillProps {
  src?: string | null;
  alt: string;
  className?: string;
  contain?: boolean;
  children?: React.ReactNode;
}

export default function ImageFill({
  src,
  alt,
  className,
  contain,
  children,
}: ImageFillProps) {
  return (
    <div className={cn(`relative flex overflow-hidden bg-white`, className)}>
      <Image
        src={src || `/logos/tastemap_logo.png`}
        fill={true}
        style={{
          objectFit: contain ? "contain" : "cover",
        }}
        alt={alt}
        priority={true}
      />
      {children}
    </div>
  );
}
