import { Linking } from "react-native";

import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

import {
  GithubIcon,
  LucideLinkedin,
  Mail,
  UserCircle,
} from "lucide-react-native";
import { Pressable } from "@/components/ui/pressable";

export default function About() {
  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <Box className="flex-1 justify-center bg-primary-100">
      <Center className="gap-2">
        <Icon as={UserCircle} className="h-32 w-32 text-primary-800" />
        <Heading className="text-2xl">Elmer Fiqi Tajusaladin</Heading>
        <Text className="text-md font-medium">
          Mobile Engineering Techical Test
        </Text>
        <Text className="text-md font-medium">for Jakmall Purpose Only</Text>

        <HStack space="xl" className="mt-4">
          <Pressable onPress={() => openLink("https://github.com/Elmerf")}>
            <Icon
              as={GithubIcon}
              className="h-8 w-8 text-primary-800"
              aria-label="github"
            />
          </Pressable>

          <Pressable
            onPress={() => openLink("https://linkedin.com/in/elmerfiqi")}
          >
            <Icon
              as={LucideLinkedin}
              className="h-8 w-8 text-primary-800"
              aria-label="linkedin"
            />
          </Pressable>

          <Pressable onPress={() => openLink("mailto:elmerfiqi@gmail.com")}>
            <Icon
              as={Mail}
              className="h-8 w-8 text-primary-800"
              aria-label="email"
            />
          </Pressable>
        </HStack>
      </Center>
    </Box>
  );
}
