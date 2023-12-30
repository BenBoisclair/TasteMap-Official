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
    { name: "Quick Bites", imagePath: "/categories/snacks.jpg" },
    { name: "Drinks", imagePath: "/categories/drinks.jpg" },
    { name: "Meals", imagePath: "/categories/meals.jpg" },
    { name: "Souvenirs", imagePath: "/categories/souvenirs.jpg" },
    { name: "Fashion", imagePath: "/categories/fashion.jpg" },
    { name: "Ingredients", imagePath: "/categories/ingredients.jpg" },
    { name: "Services", imagePath: "/categories/services.jpg" },
    { name: "Personal Use", imagePath: "/categories/personaluse.jpg" },
  ];

  if (!isMarketVerified) {
    return;
  }

  return (
    <div>
      <div className="flex items-center justify-between px-5">
        <h1 className="text-xl font-bold">Explore by categories</h1>
      </div>
      <div className="no-scrollbar mt-4 flex gap-4 overflow-x-scroll px-5">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/market/${marketId}/vendors?category=${category.name}`}
          >
            <div className="flex flex-col items-center justify-center gap-1 overflow-hidden rounded-xl">
              <div className="relative h-[280px] w-[200px] overflow-hidden ">
                <Image
                  src={category.imagePath}
                  alt={category.name}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute left-0 top-0 flex h-full w-full flex-col bg-gradient-to-b from-transparent from-30% to-black/30 "></div>
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-end pb-6">
                  <span className="mb-2 text-3xl font-bold text-white">
                    {category.name}
                  </span>
                  <div className="rounded-3xl bg-yellow px-4 py-1 font-medium">
                    Explore
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
