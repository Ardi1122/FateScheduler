import { Stack } from "expo-router"

const layout = () => {
  return (
    <Stack>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default layout