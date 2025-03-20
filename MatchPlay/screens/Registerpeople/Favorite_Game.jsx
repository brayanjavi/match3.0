import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function FavoriteGame({ navigation }) {
  const gamesArray = [
    { id: "1", label: "Fortnite" },
    { id: "2", label: "Call of Duty" },
    { id: "3", label: "League of Legends" },
    { id: "4", label: "Among Us" },
    { id: "5", label: "Minecraft" },
    { id: "6", label: "GTA V" },
    { id: "7", label: "FIFA" },
    { id: "8", label: "PUBG" },
    { id: "9", label: "Valorant" },
    { id: "10", label: "Forza Horizon" },
    { id: "11", label: "Rocket League" },
    { id: "12", label: "Apex Legends" },
    { id: "13", label: "Overwatch" },
    { id: "14", label: "World of Warcraft" },
    { id: "15", label: "Halo" },
    { id: "16", label: "The Sims" },
    { id: "17", label: "Animal Crossing" },
    { id: "18", label: "Zelda" },
    { id: "19", label: "Pokémon" },
    { id: "20", label: "Otro" },
  ];

  const [selectedGames, setSelectedGames] = useState([]);

  const toggleSelection = (game) => {
    let newSelection = [...selectedGames];

    if (newSelection.includes(game)) {
      // Si ya está seleccionado, lo quitamos
      newSelection = newSelection.filter((item) => item !== game);
    } else if (newSelection.length < 4) {
      // Solo permite seleccionar hasta 4 juegos
      newSelection.push(game);
    }

    setSelectedGames(newSelection);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿CUÁLES SON TUS JUEGOS FAVORITOS?</Text>
      <Text style={styles.subText}>
      TE RECOMENDAMOS SELECCIONAR 4 JUEGOS, 2 QUE TE APASIONE JUGAR Y 2 QUE JUEGUES CASUALMENTE
      </Text>

      {/* Opciones de Juegos */}
      <View style={styles.optionsContainer}>
        {gamesArray.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={[
              styles.optionButton,
              selectedGames.includes(game.label) && styles.selectedButton,
            ]}
            onPress={() => toggleSelection(game.label)}
          >
            <Text
              style={[
                styles.optionText,
                selectedGames.includes(game.label) && styles.selectedText,
              ]}
            >
              {game.label}
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
    fontWeight: "bold",
    marginVertical: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 5,
  },
  optionButton: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 7,
    borderRadius: 20, // Hace los botones más ovalados
    margin: 5,
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
