import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import React, { useState } from "react";

const splash = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [dots, setDots] = useState("...");
  // useEffect(() => {
  //     setTimeout(() => {
  //         router.push("/(tabs)/index")
  //     },5000)
  // }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(tabs)/(home)");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/nice.png")}
        style={{ width: 120, height: 120, borderRadius: 100 }}
      />
      <Text
        style={{
          marginTop: 20,
          color: "#fff",
          textAlign: "center",
          fontWeight: "semibold",
          fontFamily: "QuicksandSemiBold",
          fontSize: 16,
        }}
      >
        Loading{dots}
      </Text>
    </View>
  );
};

export default splash;
