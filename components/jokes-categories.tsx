import useJokesAPI from "@/hooks/useJokesAPI";
import React, { useEffect, useState } from "react";

import { Button, ButtonText } from "./ui/button";
import { Text } from "./ui/text";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Skeleton } from "./ui/skeleton";

type JokesCategoriesProps = {
  onSelectCategory: (category: string) => void;
  selectedCategories: string[];
};

const JokesCategories: React.FC<JokesCategoriesProps> = ({
  onSelectCategory,
  selectedCategories,
}) => {
  const { getJokeCategories } = useJokesAPI();

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getJokeCategories();
      setCategories(data);
      setLoading(false);

      onSelectCategory(data[0]);
    };

    loadCategories();
  }, []);

  return (
    <VStack space="sm">
      <Text className="font-semibold text-purple-700">Categories:</Text>
      <HStack space="sm" className="flex-wrap">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" className="h-12 w-16" />
            ))
          : categories.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={
                  selectedCategories.includes(category) ? "solid" : "outline"
                }
                onPress={() => onSelectCategory(category)}
              >
                <ButtonText>{category}</ButtonText>
              </Button>
            ))}
      </HStack>
    </VStack>
  );
};

export default JokesCategories;
