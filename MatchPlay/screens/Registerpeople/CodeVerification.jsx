import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
  Modal,
  Text,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function CodeVerification({ navigation, route }) {
  const { phoneNumber } = route.params;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Enfocar automáticamente en el primer input
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Mueve el foco al siguiente input si hay un número ingresado y no es el último input
    if (text.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = () => {
    const enteredCode = code.join("");
    if (enteredCode.length === 6) {
      setModalVisible(true);
    } else {
      setErrorMessage("Por favor, ingresa el código completo de 6 dígitos.");
      setErrorModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('WizardSolicitud');
  };

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/Fondo.png")} style={styles.image}>
        <View style={styles.contentContainer}>
          <Text style={styles.title} category="h1">
            VERIFICA TU NÚMERO
          </Text>

          <Text style={styles.subtitle}>
            Ingresa el código de 6 dígitos que enviamos a {phoneNumber}
          </Text>

          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeBox}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
              />
            ))}
          </View>

          <View style={styles.container_button}>
            <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
              <Text style={styles.buttonText}>SIGUIENTE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Código ingresado correctamente</Text>
            <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={handleCloseErrorModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity style={styles.button} onPress={handleCloseErrorModal}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.1,
  },
  title: {
    color: "black",
    marginBottom: height * 0.03,
    textAlign: "center",
  },
  subtitle: {
    color: "black",
    marginBottom: height * 0.05,
    textAlign: "center",
    fontSize: 16,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: height * 0.05,
  },
  codeBox: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: width * 0.01,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  container_button: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

