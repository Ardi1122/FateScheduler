import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const App = () => {
  const [data, setData] = useState([
    {
      id: "1",
      label: "Studied",
      color: "#4A4AFF",
      question: "Apa yang dilakukan malam ini?",
      answer: "Ngoding",
      date: "07:00 PM January 15 2025",
    },
  ]);

  const addData = (newItem: {
    id: string;
    label: string;
    color: string;
    question: string;
    answer: string;
    date: string;
  }) => {
    setData((prevData) => [newItem, ...prevData]);
  };
  const renderCard = ({
    item,
  }: {
    item: {
      id: string;
      label: string;
      color: string;
      question: string;
      answer: string;
      date: string;
    };
  }) => (
    <ScrollView style={[styles.card, { borderLeftColor: item.color }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardLabel, { backgroundColor: item.color }]}>
          {item.label}
        </Text>
        <FontAwesome name="ellipsis-v" size={16} color="black" />
      </View>
      <Text style={styles.cardQuestion}>{item.question}</Text>
      <Text style={styles.cardAnswer}>{item.answer}</Text>
      <Text style={styles.cardDate}>{item.date}</Text>
    </ScrollView>
  );
  return (
    <View style={styles.container}>
      <Header />
      
        <View style={styles.daysContainer}>
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <View key={index} style={styles.dayItem}>
              <Text style={styles.dayText}>{day}</Text>
              <Text style={styles.dayDate}>{`0${index + 1}`}</Text>
            </View>
          ))}
        </View>
        <FlatList
          data={data}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cardList}
        />
      
      <Footer onAddData={addData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  },
  dayItem: {
    alignItems: "center",
  },
  dayText: {
    color: "#000",
    fontSize: 14,
  },
  dayDate: {
    color: "#000",
    fontSize: 12,
  },
  cardList: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    borderLeftWidth: 5,
    marginBottom: 15,
    padding: 15,
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cardLabel: {
    fontFamily: "QuicksandSemiBold",
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  cardQuestion: {
    fontSize: 16,
    fontFamily: "QuicksandSemiBold",
    marginBottom: 5,
  },
  cardAnswer: {
    fontSize: 12,
    fontFamily: "QuicksandRegular",
  },
  cardDate: {
    fontSize: 12,
    fontFamily: "QuicksandMedium",
    marginTop: 5,
  },
});

export default App;
