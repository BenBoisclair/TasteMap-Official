import { cn } from "@/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn(`py-3 px-5`, className)}>
      <div>{children}</div>
    </div>
  );
}
