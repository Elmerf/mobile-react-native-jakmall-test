import { FetchInstance } from "@/lib/fetch";
import { useEffect, useState } from "react";

interface JokeParams {
  lang?: string;
  type?: "single" | "twopart";
  amount?: number;
  contains?: string;
  blacklistFlags?: string[];
  idRange?: string;
  safe?: boolean;
}

interface JokeFlags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}

export interface Joke {
  category: string;
  type: "single" | "twopart";
  setup?: string;
  delivery?: string;
  joke?: string;
  flags: JokeFlags;
  id: number;
  safe: boolean;
  lang: string;
}

const jokesAPI = new FetchInstance("https://v2.jokeapi.dev/");

const useJokesAPI = () => {
  const [jokeCategories, setJokeCategories] = useState<string[]>([]);

  const buildUrlWithParams = (baseUrl: string, params?: JokeParams): string => {
    if (!params) return baseUrl;

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          searchParams.append(key, value.join(","));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  const getJokeCategories = async (
    options?: RequestInit,
  ): Promise<string[]> => {
    // Return cached categories if available
    if (jokeCategories.length > 0) {
      return jokeCategories;
    }

    // Fetch categories if not cached
    try {
      const data = await jokesAPI.get<{ categories: string[] }>(
        "categories",
        options,
      );
      setJokeCategories(data.categories);
      return data.categories;
    } catch (error) {
      console.error("Failed to fetch joke categories:", error);
      return [];
    }
  };

  const getJokeList = async (
    categories?: string | string[],
    params?: JokeParams,
  ) => {
    try {
      const categoryPath = categories
        ? Array.isArray(categories)
          ? categories.join(",")
          : categories
        : "Any";
      const configParams = { amount: 7, ...params };
      const url = buildUrlWithParams(`joke/${categoryPath}`, configParams);
      if (configParams.amount === 1) {
        const data = await jokesAPI.get<Joke>(url);
        return [data];
      }
      const data = await jokesAPI.get<{ jokes: Joke[] }>(url);
      return data.jokes;
    } catch (error) {
      console.error("Failed to fetch joke list:", error);
      return [];
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    getJokeCategories({ signal: abortController.signal });

    return () => {
      abortController.abort();
    };
  }, []);

  return { getJokeCategories, getJokeList };
};

export default useJokesAPI;
