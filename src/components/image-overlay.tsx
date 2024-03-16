import { cn } from "@/utils/cn";

interface ImageOverlayProps {
  children: React.ReactNode;
  className?: string;
}

export default function ImageOverlay({
  children,
  className,
}: ImageOverlayProps) {
  return (
    <div
      className={cn(
        `absolute flex h-full w-full p-3 bg-transparent pointer-events-none`,
        className
      )}>
      {children}
    </div>
  );
}
