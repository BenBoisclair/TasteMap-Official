import { cn } from "@/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
export default function Container({ children, className }: ContainerProps) {
  return <div className={cn(`px-5 py-3`, className)}>{children}</div>;
}
