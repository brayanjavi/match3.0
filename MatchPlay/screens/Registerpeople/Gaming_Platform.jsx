import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function GamingPlatform({ navigation }) {
  const platformsArray = [
    { id: "1", label: "PlayStation" },
    { id: "2", label: "Xbox" },
    { id: "3", label: "PC" },
    { id: "4", label: "Nintendo Switch" },
    { id: "5", label: "Mobile" },
    { id: "6", label: "Otro" },
  ];

  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const toggleSelection = (platform) => {
    let newSelection = [...selectedPlatforms];

    if (newSelection.includes(platform)) {
      // Si ya está seleccionado, lo quitamos
      newSelection = newSelection.filter((item) => item !== platform);
    } else if (newSelection.length < 2) {
      // Solo permite seleccionar hasta 2 opciones
      newSelection.push(platform);
    }

    setSelectedPlatforms(newSelection);
  };

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿EN QUÉ PLATAFORMA JUEGAS?</Text>
      <Text style={styles.subText}>
        Indícanos qué plataforma usas para poder alinearte{"\n"}con personas que
        compartan tus preferencias
      </Text>

      {/* Opciones de Plataforma */}
      <View style={styles.optionsContainer}>
        {platformsArray.map((platform) => (
          <TouchableOpacity
            key={platform.id}
            style={[
              styles.optionButton,
              selectedPlatforms.includes(platform.label) && styles.selectedButton,
            ]}
            onPress={() => toggleSelection(platform.label)}
          >
            <Text
              style={[
                styles.optionText,
                selectedPlatforms.includes(platform.label) && styles.selectedText,
              ]}
            >
              {platform.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón Siguiente */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    marginTop: 50,
    backgroundColor: "#FF4500",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 30,
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