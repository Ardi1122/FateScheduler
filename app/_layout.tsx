import HomeScreen from "@/app-example/app/(tabs)";
import { Stack } from "expo-router";

export default function RootLayout() {
  
  return(
    <Stack>
      <Stack.Screen name="(screen)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
