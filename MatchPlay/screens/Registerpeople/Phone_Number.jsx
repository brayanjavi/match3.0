import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ImageBackground, TextInput, Alert, Dimensions, Modal } from 'react-native';
import { Text } from '@ui-kitten/components';

const { width, height } = Dimensions.get('window');

export default function Phone_Number({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedLada, setSelectedLada] = useState('+52');
    const [modalVisible, setModalVisible] = useState(false);

    const ladaOptions = [
        { id: '1', label: '+52 México', value: '+52' },
        { id: '2', label: '+521 México (Móvil)', value: '+521' },
    ];

    const handleSubmitRegistration = () => {
        if (!phoneNumber.trim()) {
            Alert.alert('Error', 'Por favor, ingresa tu número de celular.');
            return;
        }

        if (phoneNumber.length !== 10) {
            Alert.alert('Error', 'El número de celular debe tener exactamente 10 dígitos.');
            return;
        }

        Alert.alert(
            'Verificación',
            `Te hemos enviado un código de verificación al número ${selectedLada} ${phoneNumber}.`,
            [{ text: 'OK' }]
        );

        navigation.navigate('CodeVerification', { phoneNumber: `${selectedLada} ${phoneNumber}` });
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/Fondo.png')} style={styles.image}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title} category='h1'>INGRESA TU NÚMERO CELULAR</Text>

                    <View style={styles.phoneNumberContainer}>
                        {/* Selector de Lada */}
                        <TouchableOpacity style={styles.ladaButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.ladaText}>{selectedLada}</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.input}
                            placeholder='Número de celular'
                            maxLength={10}
                            onChangeText={setPhoneNumber}
                            value={phoneNumber}
                            keyboardType="phone-pad" // Restringe el teclado a números
                        />
                    </View>

                    <Modal visible={modalVisible} transparent animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Selecciona tu lada</Text>
                                <FlatList
                                    data={ladaOptions}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.modalItem}
                                            onPress={() => {
                                                setSelectedLada(item.value);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text style={styles.modalText}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </Modal>

                    <Text style={styles.infoText}>
                        CUANDO PRESIONES SIGUIENTE TE LLEGARÁ UN CÓDIGO DE VERIFICACIÓN.
                        PUEDE QUE RECIBAS CARGOS SEGÚN TU PLAN CELULAR.
                        EL NÚMERO QUE VERIFIQUES SERVIRÁ PARA INICIAR SESIÓN.
                    </Text>

                    <Text style={styles.profileText}>NO SE MOSTRARÁ EN TU PERFIL</Text>

                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            if (phoneNumber.length === 10) {
                                navigation.navigate('CodeVerification', { phoneNumber: phoneNumber });
                            } else {
                                Alert.alert('Error', 'El número de celular debe tener 10 dígitos');
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>SIGUIENTE</Text>
                    </TouchableOpacity> */}

                    <View style={styles.container_button}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmitRegistration}>
                            <Text style={styles.buttonText}>SIGUIENTE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.1, // Añadido padding horizontal
    },
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    title: {
        color: 'black', // Ajusta el color del texto si es necesario
        marginBottom: height * 0.05,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', // Fondo blanco para el input
        borderRadius: 5,
        paddingHorizontal: width * 0.03,
        marginBottom: height * 0.02,
        width: '100%',
    },
    prefixText: {
        fontSize: 18,
        marginRight: width * 0.02,
    },
    input: {
        flex: 1,
        fontSize: 18,
        paddingVertical: height * 0.015,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    infoText: {
        color: 'black',
        textAlign: 'center',
        marginBottom: height * 0.02,
        fontSize: 12,
    },
    profileText: {
        color: 'black',
        textAlign: 'center',
        marginBottom: height * 0.05,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalItem: {
        padding: 15,
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalText: {
        fontSize: 16,
    },
    ladaButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        marginRight: 10,
        minWidth: 80, // Tamaño de la lada más pequeño
        justifyContent: 'center',
        alignItems: 'center',
    },
    ladaText: {
        fontSize: 14, // Más pequeño que el número de teléfono
        fontWeight: 'bold',
    },
    container_button: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
});