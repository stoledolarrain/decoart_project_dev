import React from "react";
import {
  Sparkles,
  Cake,
  Heart,
  GraduationCap,
  Baby,
  Building,
  Gift,
} from "lucide-react";
import { CATEGORIES } from "../../data/products";

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Cake":
        return <Cake className="w-4 h-4" />;
      case "Heart":
        return <Heart className="w-4 h-4" />;
      case "GraduationCap":
        return <GraduationCap className="w-4 h-4" />;
      case "Baby":
        return <Baby className="w-4 h-4" />;
      case "Building":
        return <Building className="w-4 h-4" />;
      case "Gift":
        return <Gift className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div id="catalogo" className="mb-6">
      {/* Botones de categoría centrados (pasan a varias filas si no caben) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-deco-pink text-white shadow-md shadow-pink-200"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-pink-300 hover:bg-pink-50/50"
              }`}
            >
              <span className={isSelected ? "text-deco-yellow" : "text-deco-pink"}>
                {getCategoryIcon(cat.icon)}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
