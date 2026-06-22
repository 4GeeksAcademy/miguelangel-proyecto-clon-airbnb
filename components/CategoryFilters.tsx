"use client";

import { useState } from "react";

const categories = [
  { name: "Playa", icon: "🏖" },
  { name: "Mansiones", icon: "🏛" },
  { name: "Tendencias", icon: "🔥" },
  { name: "Campo", icon: "🌾" },
  { name: "Piscinas", icon: "🏊" },
  { name: "Castillos", icon: "🏰" },
] as const;

type CategoryName = (typeof categories)[number]["name"];

type CategoryFiltersProps = {
  onCategoryChange: (value: CategoryName | "") => void;
};

const CategoryFilters = ({ onCategoryChange }: CategoryFiltersProps) => {
  const [activeCategory, setActiveCategory] = useState<CategoryName | "">("");

  const handleClick = (category: CategoryName) => {
    const nextValue = activeCategory === category ? "" : category;
    setActiveCategory(nextValue);
    onCategoryChange(nextValue);
  };

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => handleClick(category.name)}
            className={`shrink-0 rounded-full border px-3 py-2 text-sm ${
              activeCategory === category.name
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            <span aria-hidden="true">{category.icon}</span> {category.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export const CategoryFiltersComponent = CategoryFilters;
