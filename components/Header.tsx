import React from "react";
import { View, Text, TextInput, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const handleSearch = (text: string) => {
    onSearch(text); // Mengirimkan query pencarian ke komponen utama
  };

  const openWebsite = () => {
    Linking.openURL("https://ardi1122.github.io/product-app/"); // Gantilah URL ini dengan URL website yang diinginkan
  };

  return (
    <View style={styles.header}>
      <View style={styles.description}>
        <Text style={styles.title}>FateScheduler</Text>
        <TouchableOpacity style={styles.websiteButton} onPress={openWebsite}>
          <Text style={styles.websiteButtonText}>🌐</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your decision"
          placeholderTextColor="#fff"
          onChangeText={handleSearch} // Mengupdate state pencarian di komponen utama
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
  websiteButton: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  websiteButtonText: {
    fontSize: 24,
    color: "#000",
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
