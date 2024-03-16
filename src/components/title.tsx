import { cn } from "@/utils/cn";

interface TitleProps {
  title: string;
  className?: string;
  icon?: React.ReactNode;
}
export default function Title({ title, className, icon }: TitleProps) {
  return (
    <div className={cn(`flex items-center gap-1`, className)}>
      {icon}
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  );
}
