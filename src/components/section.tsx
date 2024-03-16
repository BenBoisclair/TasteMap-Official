import { cn } from "@/utils/cn";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface CarouselProps {
  gap?: number;
  children?: ReactNode;
}

interface TitleProps {
  children?: ReactNode;
  link?: string;
}

interface DescriptionProps {
  children?: ReactNode;
}

// Defining the type for Section's sub-components
interface SectionProps {
  Title?: FC<TitleProps>;
  Description?: FC<DescriptionProps>;
  Carousel?: FC<CarouselProps>;
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => (
  <div className={cn(`w-full bg-white py-5`, className)}>{children}</div>
);

// Title Sub-component
Section.Title = ({ children, link }: TitleProps) => (
  <div className="px-5 flex justify-between">
    <h2 className="text-xl font-bold">{children}</h2>
    {!!link && (
      <Link href={link}>
        <ChevronRight />
      </Link>
    )}
  </div>
);

// Description Sub-component
Section.Description = ({ children }: DescriptionProps) => (
  <div className="px-5 font-medium">{children}</div>
);

// Carousel Sub-component
Section.Carousel = ({ gap = 5, children }: CarouselProps) => (
  <div className={`no-scrollbar flex gap-${gap} overflow-x-scroll px-5 py-3`}>
    {children}
  </div>
);

export default Section;
