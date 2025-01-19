import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import moment from "moment"; // Menggunakan moment.js untuk manipulasi tanggal

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(moment()); // Menyimpan tanggal yang dipilih
  const [showDateDropdown, setShowDateDropdown] = useState(false); // State untuk dropdown tanggal

  // Memuat data dari AsyncStorage saat aplikasi dimulai
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("dataList");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
          setFilteredData(parsedData); // Menyimpan data awal ke filteredData
        }
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };

    loadData();
  }, []);

  // Memfilter data berdasarkan pencarian
  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered); // Update filtered data
    } else {
      setFilteredData(data); // Jika tidak ada pencarian, tampilkan semua data
    }
  }, [searchQuery, data]);

  // Menambahkan data baru dan menyimpannya ke AsyncStorage
  const addData = async (newItem: {
    id: string;
    label: string;
    color: string;
    question: string;
    answer: string;
    date: string;
  }) => {
    const updatedData = [newItem, ...data];
    setData(updatedData);
    setFilteredData(updatedData);

    try {
      await AsyncStorage.setItem("dataList", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
  };

  // Menghapus data berdasarkan ID
  const deleteData = async (id: string) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);

    try {
      await AsyncStorage.setItem("dataList", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  // Komponen tombol hapus untuk geser
  const renderDeleteButton = (id: string) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() =>
        Alert.alert(
          "Delete Item",
          "Are you sure you want to delete this item?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => deleteData(id) },
          ]
        )
      }
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  // Render card untuk setiap item
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
    <Swipeable renderRightActions={() => renderDeleteButton(item.id)}>
      <View style={[styles.card, { borderLeftColor: item.color }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardLabel, { backgroundColor: item.color }]}>
            {item.label}
          </Text>
        </View>
        <Text style={styles.cardQuestion}>{item.question}</Text>
        <Text style={styles.cardAnswer}>{item.answer}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
    </Swipeable>
  );

  // Mendapatkan hari dalam seminggu
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  // Mendapatkan tanggal dalam bulan saat ini
  const startOfMonth = selectedDate.clone().startOf("month");
  const endOfMonth = selectedDate.clone().endOf("month");
  const daysInMonth = [];
  for (let date = startOfMonth.clone(); date.isBefore(endOfMonth); date.add(1, "day")) {
    daysInMonth.push(date.clone());
  }

  // Navigasi bulan
  const changeMonth = (direction: "prev" | "next") => {
    setSelectedDate((prevDate) =>
      direction === "prev" ? prevDate.clone().subtract(1, "month") : prevDate.clone().add(1, "month")
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header onSearch={setSearchQuery} />

      {/* Header Navigasi Bulan */}
      <View style={styles.monthHeader}>
        <TouchableOpacity onPress={() => changeMonth("prev")}>
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {selectedDate.format("MMMM YYYY")}
        </Text>
        <TouchableOpacity onPress={() => changeMonth("next")}>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Header Hari */}
      <View style={styles.daysOfWeek}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.dayOfWeekText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Toggle Dropdown Tanggal */}
      <TouchableOpacity
        style={styles.daysContainer}
        onPress={() => setShowDateDropdown(!showDateDropdown)} // Toggle dropdown
      >
        <Text style={styles.dropdownToggle}>
          {showDateDropdown ? "Hide Dates" : "Show Dates"}
        </Text>
      </TouchableOpacity>

      {/* Tanggal dalam Bulan (Dropdown) */}
      {showDateDropdown && (
        <View style={styles.daysContainer}>
          {daysInMonth.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayItem,
                moment().isSame(date, "day") && styles.todayHighlight, // Menyoroti hari ini
              ]}
              onPress={() => alert(`Tanggal yang dipilih: ${date.format("D MMMM YYYY")}`)}
            >
              <Text
                style={[
                  styles.dayText,
                  moment().isSame(date, "day") && styles.todayText,
                ]}
              >
                {date.date()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={filteredData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
      />
      <Footer onAddData={addData} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  navButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  dayOfWeekText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    flex: 1,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
    marginTop: 10,
  },
  dropdownToggle: {
    fontSize: 16,
    color: "#333",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  dayItem: {
    width: "14.28%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  todayHighlight: {
    backgroundColor: "#FFA500",
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  todayText: {
    fontWeight: "bold",
    color: "#fff",
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
  deleteButton: {
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    borderRadius: 10,
    marginVertical: 5,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default App;
