import { Link } from "expo-router"
import { View, Text } from "react-native"

const notFound = () => {
  return (
    <View>
      <Text>Not Found! Please back to home</Text>
      <Link href="/(tabs)/(home)">Back to Home</Link>
    </View>
  )
}

export default notFound