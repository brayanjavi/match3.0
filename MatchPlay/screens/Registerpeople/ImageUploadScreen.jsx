import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageUploadScreen() {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    if (!result.canceled) {
      const newImage = {
        uri: result.assets[0].uri,
        base64: result.assets[0].base64,
      };
      setImages([...images, newImage]);
    }
  };

  const getImagesAsJson = () => {
    return JSON.stringify(images);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PERSONALIZA TU PERFIL</Text>
      <Text style={styles.subtitle}>
        Sonríe y tómate un selfie! También puedes subir fotos de tus avatares,
        sets o loadouts.
      </Text>
      <View style={styles.grid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageBox}
            onPress={pickImage}
          >
            {images[index] ? (
              <Image source={{ uri: images[index].uri }} style={styles.image} />
            ) : (
              <Text style={styles.plus}>+</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9100",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "black" },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "black",
    marginVertical: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  imageBox: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
  },
  plus: { fontSize: 30, color: "gray" },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: { color: "black", fontWeight: "bold" },
});
