import useJokesAPI, { Joke } from "@/hooks/useJokesAPI";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react-native";
import { Alert } from "react-native";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  AccordionContent,
  AccordionContentText,
} from "./ui/accordion";
import { Button, ButtonText } from "./ui/button";
import { VStack } from "./ui/vstack";
import { Pressable } from "./ui/pressable";
import { Box } from "./ui/box";
import { useState } from "react";
import { SkeletonText } from "./ui/skeleton";

type JokeAccordionProps = {
  joke: Joke;
  index: number;
  handleGoTop: (index: number) => void;
};

const JokeAccordionContent: React.FC<{ joke: Joke }> = ({ joke }) => {
  return (
    <Box className="gap-2">
      <Pressable
        onPress={() => {
          Alert.alert(
            "Category: " + joke.category,
            joke.type === "single"
              ? joke.joke
              : `${joke.setup}\n\n${joke.delivery}`,
          );
        }}
      >
        {joke.type === "single" ? (
          <AccordionContentText>{joke.joke}</AccordionContentText>
        ) : (
          <VStack space="sm">
            <AccordionContentText className="font-bold">
              {joke.setup}
            </AccordionContentText>
            <AccordionContentText>{joke.delivery}</AccordionContentText>
          </VStack>
        )}
      </Pressable>
    </Box>
  );
};

const JokeAccordion: React.FC<JokeAccordionProps> = ({
  joke,
  index,
  handleGoTop,
}) => {
  const { getJokeList } = useJokesAPI();

  const [fetchCount, setFetchCount] = useState<number>(0);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchJoke = async (category: string) => {
    if (fetchCount < 2) {
      setIsLoading(true);
      const fetchedJokes = await getJokeList(category, { amount: 1 });
      setJokes((prev) => [...prev, ...fetchedJokes]);
      setIsLoading(false);
      setFetchCount((prev) => prev + 1);
    }
  };

  return (
    <Accordion key={joke.id} className="rounded-xl">
      <AccordionItem value="joke">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText className="text-primary-500">
                    {joke.category}
                  </AccordionTitleText>
                  <Button
                    size="sm"
                    variant={index === 0 ? "solid" : "outline"}
                    disabled={index === 0}
                    className={index === 0 ? "opacity-50" : ""}
                    onPress={() => handleGoTop(index)}
                  >
                    <ButtonText>{index === 0 ? "Top" : "Go To Top"}</ButtonText>
                  </Button>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent className="flex flex-col gap-4">
          <Box className="gap-2">
            <JokeAccordionContent joke={joke} />
            {jokes.map((joke) => (
              <JokeAccordionContent key={joke.id} joke={joke} />
            ))}
            {isLoading && <SkeletonText className="h-6 w-full" />}
          </Box>
          {fetchCount < 2 ? (
            <Button
              size="sm"
              variant="solid"
              onPress={() => fetchJoke(joke.category)}
            >
              <ButtonText>Add New Data</ButtonText>
            </Button>
          ) : null}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default JokeAccordion;
