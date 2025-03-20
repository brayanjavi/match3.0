import React, { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, StyleSheet, ScrollView, TouchableOpacity, View, ImageBackground } from "react-native";
import { Card, Text, Input, Button, Toggle, Select, SelectItem, Layout } from '@ui-kitten/components';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//Views
import ValidateINE from './validateINE'
import ValidatePerson from './validatePerson'
import GamingPlatform from "./Gaming_Platform";
import FavoriteGame from "./Favorite_Game";
import Register from "./Register";
import Frequency from "./Frequency";
import ImageUploadScreen from "./ImageUploadScreen";
//Component

export default function WizardSolicitud({ navigation }) {

    const [currentStep, setCurrentStep] = useState(0);
    const steps = ['Register', 'GamingPlatform', 'FavoriteGame', 'Frequency', 'ImageUpload', 'ValidateINE', 'ValidatePerson'];



    return (

        <ScrollView>
            <Layout>
                <View style={{ width: 280, height: 70 }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ height: 2, width: 180, position: 'absolute', top: 20, zIndex: 10 }} />
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', position: 'absolute', zIndex: 20, height: 70 }} >
                    </View>
                </View>
            </Layout>


            <Layout>
                {currentStep === 0 && (
                    <View>
                        <Register />
                    </View>
                )}
                {currentStep == 1 && (
                    <View>
                        <GamingPlatform />
                    </View>
                )}
                {currentStep === 2 && (
                    <View>
                        <FavoriteGame />
                    </View>
                )}
                {currentStep === 3 && (
                    <View>
                        <Frequency />
                    </View>
                )}
                {currentStep === 4 && (
                    <View>
                        <ImageUploadScreen />
                    </View>
                )}
                {currentStep === 5 && (
                    <View>
                        <ValidateINE />
                    </View>
                )}
                {currentStep === 6 && (
                    <View>
                        <ValidatePerson />
                    </View>
                )}

                <View style={[styles.container_button, { justifyContent: currentStep > 0 ? 'space-between' : 'center' }]}>
                    {currentStep > 0 && (
                        <TouchableOpacity style={styles.button} onPress={() => setCurrentStep(currentStep - 1)}>
                            <Text style={styles.buttonText}>Regresar</Text>
                        </TouchableOpacity>
                    )}

                    {currentStep + 1 < steps.length && (
                        <TouchableOpacity style={styles.button} onPress={() => setCurrentStep(currentStep + 1)}>
                            <Text style={styles.buttonText}>Siguiente</Text>
                        </TouchableOpacity>
                    )}

                    {currentStep + 1 === steps.length && (
                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Home") }}>
                            <Text style={styles.buttonText}>Finalizar</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </Layout>
        </ScrollView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: windowWidth * 1,
        marginLeft: 15,
        marginTop: 20
    },
    txt: {
        marginBottom: 20,

    },
    btn: {
        margin: 20,
    },
    select: {
        flex: 1,
        margin: 2,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    select: {
        flex: 1,
        margin: 2,
    },
    touchableOpacity: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10,
        marginRight: 80,
        marginLeft: 80,
        width: 85,
        height: 35,
        backgroundColor: '#ffa600',
        elevation: 10,
        borderRadius: 20
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#ffa600',
        borderWidth: 2,
        borderColor: '#ffa600',
        borderRadius: 15,
        marginBottom: 10
    },
    container_button: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 160,
    },
    button: {
        backgroundColor: "red",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "white",
    },
});