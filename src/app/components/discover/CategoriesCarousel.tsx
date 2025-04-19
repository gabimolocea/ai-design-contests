"use client";

import { Button } from "@/app/components/ui/button";
import { ScrollArea, ScrollBar } from "@/app/components/ui/scroll-area";
import { Category } from "./types";
import { useState } from "react";

export default function CategoriesCarousel({ categories }: { categories: Category[] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 pb-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}