import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";

const CategoriesSection = ({
  marketId,
  isMarketVerified = true,
  variant = "Default",
}: {
  marketId?: string;
  isMarketVerified?: boolean | null;
  variant?: "Default" | "Icon";
}) => {
  // Array of category objects
  const categoriesCardVariant = [
    { name: "Quick Bites", imagePath: "/categories/snacks.jpg" },
    { name: "Drinks", imagePath: "/categories/drinks.jpg" },
    { name: "Meals", imagePath: "/categories/meals.jpg" },
    { name: "Souvenirs", imagePath: "/categories/souvenirs.jpg" },
    { name: "Fashion", imagePath: "/categories/fashion.jpg" },
    { name: "Ingredients", imagePath: "/categories/ingredients.jpg" },
    { name: "Services", imagePath: "/categories/services.jpg" },
    { name: "Personal Use", imagePath: "/categories/personaluse.jpg" },
  ];

  const categoriesIconVariant = [
    { name: "Quick Bites", imagePath: "/categories/snacks.png" },
    { name: "Drinks", imagePath: "/categories/drinks.png" },
    { name: "Meals", imagePath: "/categories/meals.png" },
    { name: "Souvenirs", imagePath: "/categories/souvenirs.png" },
    { name: "Fashion", imagePath: "/categories/fashion.png" },
    { name: "Ingredients", imagePath: "/categories/ingredients.png" },
    { name: "Services", imagePath: "/categories/services.png" },
    { name: "Personal Use", imagePath: "/categories/personaluse.png" },
  ];

  if (!isMarketVerified) {
    return;
  }

  return (
    <div className="rounded-3xl bg-white py-5">
      <div className="flex items-center justify-between px-5">
        <h1 className="text-xl font-bold">Explore by Categories</h1>
      </div>
      <div
        className={cn(`no-scrollbar mt-4 px-5`, {
          "flex gap-4 overflow-x-scroll": variant === "Default",
          "grid grid-cols-4 grid-rows-2 gap-1.5 gap-y-6": variant === "Icon",
        })}>
        {variant === "Default"
          ? categoriesCardVariant.map((category, index) => (
              <Link
                key={index}
                href={
                  marketId
                    ? `/market/${marketId}/vendors?category=${category.name}`
                    : `/vendors?category=${category.name}`
                }>
                <CategoryCardVariant category={category} />
              </Link>
            ))
          : categoriesIconVariant.map((category, index) => (
              <Link
                key={index}
                href={
                  marketId
                    ? `/market/${marketId}/vendors?category=${category.name}`
                    : `/vendors?category=${category.name}`
                }>
                <CategoryIconVariant category={category} />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoriesSection;

type Category = {
  name: string;
  imagePath: string;
};

const CategoryCardVariant = ({ category }: { category: Category }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1 overflow-hidden rounded-xl">
        <div className="relative h-[280px] w-[200px] overflow-hidden ">
          <Image
            src={category.imagePath}
            alt={category.name}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col bg-gradient-to-b from-transparent from-30% to-black/30 "></div>
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-end pb-6">
            <span className="mb-2 px-4 text-center text-3xl font-bold text-white">
              {category.name}
            </span>
            <div className="rounded-3xl bg-yellow px-4 py-1 font-medium">
              Explore
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CategoryIconVariant = ({ category }: { category: Category }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <Image
          src={category.imagePath}
          alt={category.name}
          width={55}
          height={55}
        />
        <span className="whitespace-nowrap text-sm font-medium">
          {category.name}
        </span>
      </div>
    </>
  );
};
