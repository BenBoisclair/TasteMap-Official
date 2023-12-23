"use client";

import Image from "next/image";
import Link from "next/link";

const CategoriesSection = ({
  marketId,
  isMarketVerified,
}: {
  marketId: string;
  isMarketVerified: boolean;
}) => {
  // Array of category objects
  const categories = [
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
    <div>
      <div className="flex items-center justify-between px-5">
        <h1 className="text-lg font-bold">Explore by categories</h1>
      </div>
      <div className="mt-4 grid grid-cols-4 grid-rows-2 gap-1.5 gap-y-6 px-5">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/market/${marketId}/vendors?category=${category.name}`}
          >
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
