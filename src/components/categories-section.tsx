import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import ImageFill from "./image-fill";
import ImageOverlay from "./image-overlay";

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
    { name: "Meals", imagePath: "/categories/meals.jpg" },
    { name: "Drinks", imagePath: "/categories/drinks.jpg" },
    { name: "Desserts", imagePath: "/categories/desserts_card.png" },
    { name: "Souvenirs", imagePath: "/categories/souvenirs.jpg" },
    { name: "Fashion", imagePath: "/categories/fashion_card.png" },
    { name: "Fresh", imagePath: "/categories/ingredients.jpg" },
    { name: "Services", imagePath: "/categories/services.jpg" },
    { name: "Personal Use", imagePath: "/categories/personaluse.jpg" },
  ];

  const categoriesIconVariant = [
    { name: "Meals", imagePath: "/categories/meals.png" },
    { name: "Drinks", imagePath: "/categories/drinks.png" },
    { name: "Desserts", imagePath: "/categories/snacks.png" },
    { name: "Souvenirs", imagePath: "/categories/souvenirs.png" },
    { name: "Fashion", imagePath: "/categories/fashion.png" },
    { name: "Fresh", imagePath: "/categories/ingredients.png" },
    { name: "Services", imagePath: "/categories/services.png" },
    { name: "Personal Use", imagePath: "/categories/personaluse.png" },
  ];

  if (!isMarketVerified) {
    return;
  }

  return (
    <div className=" bg-white py-5">
      <div className="flex items-center justify-between px-5">
        <h1 className="text-xl font-bold">Explore by Categories</h1>
      </div>
      <div
        className={cn(`no-scrollbar my-4 px-5`, {
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
      <ImageFill
        src={category.imagePath}
        alt={category.name}
        className="h-[160px] w-[160px] rounded-3xl">
        <ImageOverlay className="flex-col justify-end bg-gradient-to-b from-transparent to-black from-50%">
          <span className="text-2xl font-bold text-white">{category.name}</span>
        </ImageOverlay>
      </ImageFill>
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
