import { Tabs } from "expo-router";
import { Home, User } from "lucide-react-native";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Icon } from "@/components/ui/icon";

import "@/global.css";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: "shift",
          tabBarActiveTintColor: "rgb(127, 15, 255)",
          tabBarInactiveTintColor: "rgb(191, 164, 255)",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Icon color={color} as={Home} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            tabBarIcon: ({ color }) => <Icon color={color} as={User} />,
          }}
        />
      </Tabs>
    </GluestackUIProvider>
  );
}
