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

// Defining the type for Section's sub-components
interface SectionProps {
  Title?: FC<TitleProps>;
  Carousel?: FC<CarouselProps>;
  children: ReactNode;
}

const Section = ({ children }: SectionProps) => (
  <div className="w-full rounded-3xl bg-white py-5">{children}</div>
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

// Carousel Sub-component
Section.Carousel = ({ gap = 5, children }: CarouselProps) => (
  <div className={`no-scrollbar flex gap-${gap} overflow-x-scroll px-5 py-3`}>
    {children}
  </div>
);

export default Section;
