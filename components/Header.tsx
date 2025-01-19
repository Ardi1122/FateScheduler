import React from "react";
import { View, Text, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.description}>
        <Text style={styles.title}>FateScheduler</Text>
        <FontAwesome name="toggle-on" size={48} color="white" />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your decision"
          placeholderTextColor="#fff"
        />
        <FontAwesome
          style={styles.search}
          name="search"
          size={18}
          color="black"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: "#000",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#FFF",
    fontFamily: "QuicksandBold",
  },
  search: {
    padding: 18,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    marginTop: 50,
    padding: 5,
    borderRadius: 50,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontFamily: "QuicksandLight",
    fontSize: 20,
    marginLeft: 25,
  },
});

export default Header;
