import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

import { Box } from "./ui/box";
import { Skeleton } from "./ui/skeleton";
import { VStack } from "./ui/vstack";

import useJokesAPI, { Joke } from "@/hooks/useJokesAPI";
import JokeAccordion from "./joke-accordion";

type JokeListProps = {
  selectedCategories?: string[];
};

const JokeList: React.FC<JokeListProps> = (props) => {
  const { getJokeList } = useJokesAPI();

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [jokes, setJokes] = useState<Joke[]>([]);

  const fetchJokes = async (showLoading = true) => {
    if (!props.selectedCategories?.length) return;

    try {
      if (showLoading) setIsLoading(true);
      const fetchedJokes = await getJokeList(props.selectedCategories);
      setJokes(fetchedJokes);
    } catch (error) {
      console.error("Failed to fetch joke list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchJokes();
    setRefreshing(false);
  }, [props.selectedCategories]);

  useEffect(() => {
    fetchJokes();
  }, [props.selectedCategories]);

  if (isLoading) {
    return (
      <VStack space="md">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" variant="rounded" />
        ))}
      </VStack>
    );
  }

  const handleGoTop = (jokeIndex: number) => {
    const newJokes = [...jokes];
    const [joke] = newJokes.splice(jokeIndex, 1);
    newJokes.unshift(joke);
    setJokes(newJokes);
  };

  return (
    <Box className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack space="md">
          {jokes.map((joke, index) => (
            <JokeAccordion
              key={joke.id}
              joke={joke}
              index={index}
              handleGoTop={handleGoTop}
            />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default JokeList;
