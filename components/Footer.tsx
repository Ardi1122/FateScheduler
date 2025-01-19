import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";

interface FooterProps {
  onAddData: (data: {
    id: string;
    label: string;
    question: string;
    answer: string;
    date: string;
    color: string;
  }) => void;
}

const Footer: React.FC<FooterProps> = ({ onAddData }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [tag, setTag] = useState("");
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [color, setColor] = useState("#4A4AFF");

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setDateTime(formattedDate);
    setDatePickerVisible(false);
  };

  const handleAdd = async () => {
    if (tag && question && choices && dateTime) {
      const choicesArray = choices.split(",").map((choice) => choice.trim());
      const randomChoice =
        choicesArray[Math.floor(Math.random() * choicesArray.length)];
      const newData = {
        id: Date.now().toString(),
        label: tag,
        question,
        answer: randomChoice,
        date: dateTime,
        color,
      };

      // Memperbarui AsyncStorage
      try {
        const storedData = await AsyncStorage.getItem("dataList");
        const existingData = storedData ? JSON.parse(storedData) : [];
        const updatedData = [newData, ...existingData];
        await AsyncStorage.setItem("dataList", JSON.stringify(updatedData));
      } catch (error) {
        console.error("failed to save data to AsyncStorage:", error);
      }

      // Menambahkan data ke dalam aplikasi
      onAddData(newData);

      // Reset form dan tutup modal
      setModalVisible(false);
      setTag("");
      setQuestion("");
      setChoices("");
      setDateTime("");
    } else {
      alert("Please fill all pools!");
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#000" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add new data</Text>
            <View style={styles.rowContainer}>
              <TextInput
                placeholder="Tag"
                style={[styles.input, { flex: 1 }]}
                value={tag}
                onChangeText={setTag}
              />
              <TouchableOpacity
                style={[styles.colorBox, { backgroundColor: color }]}
                onPress={() =>
                  setColor(
                    color === "#4A4AFF"
                      ? "#FF6B6B"
                      : color === "#FF6B6B"
                      ? "#4CAF50"
                      : "#4A4AFF"
                  )
                }
              />
            </View>
            <TextInput
              placeholder="question"
              style={styles.input}
              value={question}
              onChangeText={setQuestion}
            />
            <TextInput
              placeholder="decisions (separate with commas)"
              style={styles.input}
              value={choices}
              onChangeText={setChoices}
            />
            <TouchableOpacity
              onPress={() => setDatePickerVisible(true)}
              style={styles.input}
            >
              <Text>{dateTime || "select date and time"}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={() => setDatePickerVisible(false)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleAdd}
              >
                <Text style={styles.buttonSave}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#000",
    padding: 35,
    alignItems: "center",
    position: "relative",
    borderTopLeftRadius: 15,
  },
  addButton: {
    backgroundColor: "#fff",
    padding: 15,
    fontWeight: "bold",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
    position: "absolute",
    top: -30,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  saveButton: {
    backgroundColor: "#000",
  },
  buttonCancel: {
    color: "#000",
    fontWeight: "bold",
  },
  buttonSave: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Footer;
