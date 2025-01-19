import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
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
  const [tag, setTag] = useState("");
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [color, setColor] = useState("#4A4AFF");

  const handleAdd = () => {
    if (tag && question && choices && dateTime) {
      const choicesArray = choices.split(",").map((choice) => choice.trim());
      const randomChoice =
        choicesArray[Math.floor(Math.random() * choicesArray.length)];
      onAddData({
        id: Date.now().toString(),
        label: tag,
        question,
        answer: randomChoice,
        date: dateTime,
        color,
      });
      setModalVisible(false);
      setTag("");
      setQuestion("");
      setChoices("");
      setDateTime("");
    } else {
      alert("Mohon isi semua kolom!");
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
            <Text style={styles.modalTitle}>Tambah Data Baru</Text>
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
                placeholder="Pertanyaan"
                style={styles.input}
                value={question}
                onChangeText={setQuestion}
              />
              <TextInput
                placeholder="Keputusan (pisahkan dengan koma)"
                style={styles.input}
                value={choices}
                onChangeText={setChoices}
              />
              <TextInput
                placeholder="Tanggal dan Waktu (contoh: 07:00 PM January 15 2025)"
                style={styles.input}
                value={dateTime}
                onChangeText={setDateTime}
              />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonCancel}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleAdd}
              >
                <Text style={styles.buttonSave}>Selesai</Text>
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
