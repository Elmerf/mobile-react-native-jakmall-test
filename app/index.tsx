import { useState } from "react";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import JokesCategories from "@/components/jokes-categories";
import JokeList from "@/components/joke-list";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategorySelect = (category: string) => {
    if (category === "Any") {
      // If selecting "Any", clear other selections
      setSelectedCategories(["Any"]);
    } else {
      // If selecting other category
      setSelectedCategories((prev) => {
        // Remove "Any" if it was previously selected
        const withoutAny = prev.filter((c) => c !== "Any");

        // Toggle the selected category
        return withoutAny.includes(category)
          ? withoutAny.filter((c) => c !== category)
          : [...withoutAny, category];
      });
    }
  };

  return (
    <VStack space="md" className="flex-1 px-2 py-4">
      <Heading size="2xl" className="text-center text-primary-500">
        Jokes List
      </Heading>

      <JokesCategories
        onSelectCategory={handleCategorySelect}
        selectedCategories={selectedCategories}
      />

      <JokeList selectedCategories={selectedCategories} />
    </VStack>
  );
}
