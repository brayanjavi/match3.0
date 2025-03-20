import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  ImageBackground
} from 'react-native';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import { Controller, useForm } from "react-hook-form";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Welcome({ navigation }) {
    const [termsAccepted, setTermsAccepted] = useState(false);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/Fondo.png')}>
        
            {/* Título de bienvenida */}
            <Text style={styles.title}>Te damos la bienvenida a Match&Play.</Text>
            
            {/* Subtítulo */}
            <Text style={styles.subtitle}>Aqui van los terminos y condiciones</Text>
            <Text style={styles.subtitle}>Aqui van los terminos y condiciones</Text>
            <Text style={styles.subtitle}>Aqui van los terminos y condiciones</Text>
            <Text style={styles.subtitle}>Aqui van los terminos y condiciones</Text>
            <Text style={styles.subtitle}>Aqui van los terminos y condiciones</Text>
            <Text style={styles.subtitle}>Aqui van los terminos y condiciones</Text>

            {/* Mensaje de términos y condiciones */}
            <TouchableOpacity 
                style={[styles.termsContainer, termsAccepted && styles.termsAccepted]} 
                onPress={() => setTermsAccepted(!termsAccepted)}
            >
                <Text style={styles.termsText}>
                    {termsAccepted ? "✅ Aceptaste los términos y condiciones" : "☑ Acepto los términos y condiciones"}
                </Text>
            </TouchableOpacity>

            {/* Botón de continuar */}
            <TouchableOpacity 
                style={[styles.button, !termsAccepted && styles.buttonDisabled]} 
                disabled={!termsAccepted}
                onPress={() => navigation.navigate('WizardSolicitud')}
            >
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
                </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#666",
        marginBottom: 30,
    },
    termsContainer: {
        backgroundColor: "#ddd",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    termsAccepted: {
        backgroundColor: "#4CAF50",
    },
    termsText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    button: {
        backgroundColor: "#5179e8",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: "#aaa",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: "absolute", // Fija la imagen en el fondo
    },
});
