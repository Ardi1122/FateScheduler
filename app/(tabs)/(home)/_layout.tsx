import { Stack } from "expo-router"

const Homelayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
    </Stack>
  )
}

export default Homelayout