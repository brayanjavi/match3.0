import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput, Alert, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
    const [userEmail, setUserEmail] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [request, response, promptAsync,] = Google.useAuthRequest({
        androidClientId: '803298553528-fj3hp8qt7r3tncrfk8us128s61lqa2uf.apps.googleusercontent.com',
        webClientId: '803298553528-fj3hp8qt7r3tncrfk8us128s61lqa2uf.apps.googleusercontent.com',
        redirectUri: 'com.googleusercontent.apps.803298553528-fj3hp8qt7r3tncrfk8us128s61lqa2uf:/oauthredirect',
        scopes: ['openid', 'profile', 'email'],
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.authentication;
            fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token)
                .then((res) => res.json())
                .then((data) => {
                    setUserEmail(data.email);
                    AsyncStorage.setItem('userEmail', data.email);
                    setModalVisible(true);
                })
                .catch((error) => {
                    setErrorMessage('No se pudo obtener la información del usuario.');
                    setModalVisible(true);
                });
        }
    }, [response]);

    const handleGoogleLogin = () => {
        promptAsync();
    };

    const handleAppleLogin = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            if (credential) {
                setUserEmail(credential.email);
                AsyncStorage.setItem('userEmail', credential.email);
                setModalVisible(true);
            }
        } catch (e) {
            if (e.code === 'ERR_CANCELED') {
                setErrorMessage('Inicio de sesión cancelado.');
            } else {
                setErrorMessage('No se pudo iniciar sesión con Apple.');
            }
            setModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        if (userEmail) {
            navigation.navigate('Register', { email: userEmail });
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/Fondo.png')} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/Logo.png')}
                    />
                    <Text style={styles.title}>MATCH <Text style={styles.title}>&</Text> <Text style={styles.orangeText}>PLAY</Text></Text>
                    <Text style={styles.subtitle}>EL MATCHMAKING QUE SÍ FUNCIONA</Text>
                    <TouchableOpacity style={styles.buttonApple} onPress={handleAppleLogin}>
                        <Ionicons name="logo-apple" size={24} color="black" />
                        <Text style={styles.buttonText}>CONTINUAR CON APPLE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGoogle} onPress={handleGoogleLogin}>
                        <Ionicons name="logo-google" size={24} color="black" />
                        <Text style={styles.buttonText}>CONTINUAR CON GOOGLE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPhone} onPress={() => navigation.navigate('WizardRegister')}>
                        <Ionicons name="call" size={24} color="black" />
                        <Text style={styles.buttonText}>CONTINUAR CON NÚMERO CELULAR</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}>
                        AL REGISTRARTE, ACEPTAS NUESTROS TÉRMINOS Y CONDICIONES Y POLÍTICA DE PRIVACIDAD. DESCUBRE CÓMO USAMOS TUS DATOS EN NUESTRA POLÍTICA DE PRIVACIDAD. NUNCA PUBLICAREMOS NADA SIN TU PERMISO.
                    </Text>
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
                        <Text style={styles.modalText}>{errorMessage || `Bienvenido: ${userEmail}`}</Text>
                        <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        //marginBottom: 10,
        resizeMode: 'stretch'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        width: 380,
        height: 50,
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    orangeText: {
        color: '#ff6600',
    },
    footerText: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        marginTop: 30,
    },
    buttonApple: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 30,
        width: '80%',
        marginBottom: 20,
    },
    buttonGoogle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 30,
        width: '80%',
        marginBottom: 20,
    },
    buttonPhone: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 30,
        width: '80%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
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