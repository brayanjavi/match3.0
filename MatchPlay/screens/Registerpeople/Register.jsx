import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';

export default function Register({ navigation }) {
    const [name, setName] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [Gender, setGender] = useState(new IndexPath(0));
    const [location, setLocation] = useState(null);
    
    const genderOptions = [
        { id: '1', label: 'Masculino', value: 'Masculino' },
        { id: '2', label: 'Femenino', value: 'Femenino' },
        { id: '3', label: 'Otro', value: 'Otro' },
    ];

    const platformsArray = [
        { id: "1", label: "PlayStation" },
        { id: "2", label: "Xbox" },
        { id: "3", label: "PC" },
        { id: "4", label: "Nintendo Switch" },
        { id: "5", label: "Mobile" },
        { id: "6", label: "Otro" },
      ];

        const [selectedPlatforms, setSelectedPlatforms] = useState([]);
      

    useFocusEffect(
        useCallback(() => {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Error', 'Permiso de ubicación denegado');
                    return;
                }

                let locationData = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: locationData.coords.latitude,
                    longitude: locationData.coords.longitude,
                });
            })();
        }, [])
    );

    const calculateAge = (birthDate) => {
        const birth = birthDate.split('/');
        const birthYear = parseInt(birth[2], 10);
        const birthMonth = parseInt(birth[1], 10) - 1;
        const birthDay = parseInt(birth[0], 10);

        const today = new Date();
        const ageInMillisec = today - new Date(birthYear, birthMonth, birthDay);
        return Math.floor(ageInMillisec / (1000 * 60 * 60 * 24 * 365.25));
    };

    const handleSubmitRegistration = () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Por favor, ingresa tu nombre.');
            return;
        }

        if (!day || !month || !year) {
            Alert.alert('Error', 'Por favor, completa todos los campos de fecha.');
            return;
        }

        const formattedDob = `${day}/${month}/${year}`;
        const dobRegex = /^([0-2][0-9]|(3)[0-1])\/([0][1-9]|[1][0-2])\/([0-9]{4})$/;

        if (!dobRegex.test(formattedDob)) {
            Alert.alert('Error', 'Por favor, ingresa una fecha válida en formato DD/MM/YYYY.');
            return;
        }

        const calculatedAge = calculateAge(formattedDob);
        if (calculatedAge < 18) {
            Alert.alert('Error', 'Debes ser mayor de 18 años para continuar.');
            return;
        }

        if (!selectedGender) {
            Alert.alert('Error', 'Por favor, selecciona un género.');
            return;
        }

        if (!location) {
            Alert.alert('Error', 'No se pudo obtener la ubicación.');
            return;
        }

        const userData = {
            name,
            dob: formattedDob,
            age: calculatedAge,
            gender: selectedGender,
            location,
        };

        console.log(userData);
        navigation.navigate('WizardSolicitud', { userData });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CUÉNTANOS SOBRE TI</Text>
            <Text style={styles.sub}>
                Tu nombre será público, así como tu edad.{"\n"}Tu género será visible solo para ti.
            </Text>

            <Text style={styles.subtitle}>¿CUÁL ES TU NOMBRE?
            <Text style={styles.description}> Esto será visible para otros usuarios</Text>
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.subtitle}>¿CUÁNDO NACISTE?
                <Text style={styles.description}> Usamos esto para mostrar tu edad</Text>
                </Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Día</Text>
                    <TextInput
                        style={styles.input_edad}
                        placeholder='DD'
                        keyboardType="numeric"
                        maxLength={2}
                        value={day}
                        onChangeText={setDay}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Mes</Text>
                    <TextInput
                        style={styles.input_edad}
                        placeholder='MM'
                        keyboardType="numeric"
                        maxLength={2}
                        value={month}
                        onChangeText={setMonth}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Año</Text>
                    <TextInput
                        style={styles.input_edad}
                        placeholder='AAAA'
                        keyboardType="numeric"
                        maxLength={4}
                        value={year}
                        onChangeText={setYear}
                    />
                </View>
            </View>

            <Text style={styles.subtitle}>¿CUAL ES TU GÉNERO?
                <Text style={styles.description}> Esto no será visible para otros usuarios</Text>
                </Text>
                <View style={styles.optionsContainerGender}>
                        {genderOptions.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            style={[
                              styles.optionButtonGender,
                              selectedGender === item.label && styles.selectedButton,
                            ]}
                            onPress={() => setSelectedGender(item.label)}
                          >
                            <Text
                              style={[
                                styles.optionText,
                                selectedGender === item.label && styles.selectedText,
                              ]}
                            >
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                </View>
            {/* <View style={styles.container_button}>
            <TouchableOpacity style={styles.button} onPress={handleSubmitRegistration}>
                <Text style={styles.buttonText}>SIGUIENTE</Text>
            </TouchableOpacity>
        </View> */}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        marginTop: 30,
        backgroundColor: '#FF4500',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 10,
        marginVertical: 8,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 40,
    },
    sub: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
    },
    input: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 8,
        paddingLeft: 10,
        borderRadius: 30, 
        marginTop: 10,
        backgroundColor: '#fff',
    },
    input_edad: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 4,
        paddingLeft: 10,
        textAlign: 'center',
        borderRadius: 30, 
        marginTop: 10,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputWrapper: {
        flex: 1,
        padding: 4,
    },
    inpu: {
        borderWidth: 1,
        marginTop: 30,
        backgroundColor: '#fff',
      },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container_button: {
        justifyContent: 'flex-end', // Coloca el botón en la parte inferior
        alignItems: 'center', // Centra el botón horizontalmente
        paddingBottom: 30, // Espaciado desde el fondo
        marginTop: 130,
    },
    button: {
        backgroundColor: '#007bff', // Color azul bonito
        paddingVertical: 15, // Altura del botón
        paddingHorizontal: 70, // Ancho del botón
        borderRadius: 30, // Bordes redondeados
        shadowColor: '#000', // Sombra ligera
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Sombra en Android
    },
    buttonText: {
        color: '#fff', // Texto en blanco
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
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
  optionsContainerGender: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
 optionButtonGender: {
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
});
