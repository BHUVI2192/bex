
import React from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      <Button
        variant={selectedCategory === null ? "default" : "secondary"}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className={`rounded-full ${
          selectedCategory === null ? "bg-esports-purple" : ""
        }`}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "secondary"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`rounded-full ${
            selectedCategory === category.id ? "bg-esports-purple" : ""
          }`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
