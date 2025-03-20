import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Frequency({ navigation }) {
  const frequencyArray = [
    { id: "1", label: "Baja" },
    { id: "2", label: "Regular" },
    { id: "3", label: "Frecuente" },
    { id: "4", label: "Alta" },
    { id: "5", label: "Tengo un problema" },
  ];

  const [selectedFrequency, setSelectedFrequency] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿CUÁL ES TU FRECUENCIA DE JUEGO?</Text>
      <Text style={styles.subText}>
      AYÚDANOS A ENTENDERTE PARA MATCHEARTE CON PERSONAS COMO TU
      </Text>

      {/* Opciones de Frecuencia */}
      <View style={styles.optionsContainer}>
        {frequencyArray.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.optionButton,
              selectedFrequency === item.label && styles.selectedButton,
            ]}
            onPress={() => setSelectedFrequency(item.label)}
          >
            <Text
              style={[
                styles.optionText,
                selectedFrequency === item.label && styles.selectedText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    marginTop: 50,
    backgroundColor: "#FF4500", // Fondo naranja fuerte
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 16,
    fontWeight: 'bold',
        marginTop: 30,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  optionButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, // Hace los botones más ovalados
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  selectedButton: {
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Hace el botón opaco al seleccionarlo
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selectedText: {
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
