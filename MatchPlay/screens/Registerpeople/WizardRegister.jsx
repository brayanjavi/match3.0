import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useForm, Controller } from 'react-hook-form';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera"


const steps = ['Register', 'GamingPlatform', 'FavoriteGame', 'Frequency', 'ImageUpload', 'ValidateINE', 'ValidatePerson'];

const WizardRegister = ({ navigation }) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [Gender, setGender] = useState(new IndexPath(0));
    const [location, setLocation] = useState(null);
    //-----
    const genderOptions = [
        { id: '1', label: 'Masculino', value: 'Masculino' },
        { id: '2', label: 'Femenino', value: 'Femenino' },
        { id: '3', label: 'Otro', value: 'Otro' },
    ];
    //----
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
    //---
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

    const toggleSelection2 = (game) => {
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
    //---
    const frequencyArray = [
        { id: "1", label: "Baja" },
        { id: "2", label: "Regular" },
        { id: "3", label: "Frecuente" },
        { id: "4", label: "Alta" },
        { id: "5", label: "Tengo un problema" },
    ];

    const [selectedFrequency, setSelectedFrequency] = useState(null);
    //----
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
    //---
    const [facing, setFacing] = useState("back")
    const [permission, requestPermission] = useCameraPermissions()
    const [photo, setPhoto] = useState(null)
    const cameraRef = useRef(null)


    if (!permission) {
        // Camera permissions are still loading.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Loading...</Text>
            </View>
        )
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        )
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === "back" ? "front" : "back"))
    }

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync()
            setPhoto(photo)
        }
    }

    //---
    const { control, handleSubmit, formState: { errors }, trigger } = useForm();
    const [currentStep, setCurrentStep] = useState(0);

    const onNext = async () => {
        const isValid = await trigger(currentStep === 0 ? "name" : "email");
        if (isValid) setCurrentStep(currentStep + 1);
    };

    const onBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const onSubmit = data => {
        console.log("Datos enviados:", data);
    };
    //----
    /**pantallas 
      * nombre,nacimiento ,genero
      * plataformas de juego
      * juegos favoritos
      * frecuencia de juego
      * fotos de perfil
      * valida ine
      * valida persona
      */
    return (
        <ImageBackground source={require('../../assets/Fondo.png')} style={{ width: '100%', height: '100%' }}>
            <Swiper loop={false} index={currentStep} showsPagination={false} scrollEnabled={false}>
                {/**paso 1 */}
                <View style={styles.slide}>
                    <Text style={styles.title}>CUÉNTANOS SOBRE TI</Text>
                    <Text style={styles.sub}>
                        Tu nombre será público, así como tu edad.{"\n"}Tu género será visible solo para ti.
                    </Text>

                    <Text style={styles.subtitle}>¿CUÁL ES TU NOMBRE?
                        <Text style={styles.description}> Esto será visible para otros usuarios</Text>
                    </Text>
                    {/**nombre */}
                    <Text style={styles.label}>Nombre:</Text>
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: 'El nombre es requerido' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Ingresa tu nombre"
                            />
                        )}
                    />
                    {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                    {/**Nacimiento */}
                    <Text style={styles.subtitle}>¿CUÁNDO NACISTE?
                        <Text style={styles.description}> Usamos esto para mostrar tu edad</Text>
                    </Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Día</Text>
                            <Controller
                                control={control}
                                name="day"
                                rules={{ required: 'El día es requerido' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input_edad}
                                        placeholder='DD'
                                        keyboardType="numeric"
                                        maxLength={2}
                                        value={day}
                                        onChangeText={setDay}
                                    />
                                )}
                            />
                            {errors.day && <Text style={styles.error}>{errors.day.message}</Text>}
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Mes</Text>
                            <Controller
                                control={control}
                                name="month"
                                rules={{ required: 'El mes es requerido' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input_edad}
                                        placeholder='MM'
                                        keyboardType="numeric"
                                        maxLength={2}
                                        value={month}
                                        onChangeText={setMonth}
                                    />
                                )}
                            />
                            {errors.month && <Text style={styles.error}>{errors.month.message}</Text>}
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.label}>Año</Text>
                            <Controller
                                control={control}
                                name="year"
                                rules={{ required: 'El año es requerido' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input_edad}
                                        placeholder='AAAA'
                                        keyboardType="numeric"
                                        maxLength={4}
                                        value={year}
                                        onChangeText={setYear}
                                    />
                                )}
                            />
                            {errors.year && <Text style={styles.error}>{errors.year.message}</Text>}
                        </View>
                    </View>
                    {/**Genero */}
                    <Text style={styles.subtitle}>¿CUAL ES TU GÉNERO?
                        <Text style={styles.description}> Esto no será visible para otros usuarios</Text>
                    </Text>
                    <Controller
                        control={control}
                        name='gender'
                        rules={{ required: 'El género es requerido' }}
                        render={({ field: { onChange, onBlur, value } }) => (
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
                        )}
                    />
                    <Button title="Siguiente" onPress={onNext} />
                </View>
                {/**paso 2 */}
                <View style={styles.slide}>
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
                    <Button title="Atrás" onPress={onBack} />
                    <Button title="Siguiente" onPress={onNext} />
                </View>
                {/**paso 3 */}
                <View style={styles.slide}>
                    <Text style={styles.title}>¿CUÁL ES TU JUEGO FAVORITO?</Text>
                    <Text style={styles.subText}>
                        Indícanos cuál es tu juego favorito para poder alinearte{"\n"}con personas que compartan tus preferencias
                    </Text>
                    <Text style={styles.label}>Juego favorito:</Text>
                    <Controller
                        control={control}
                        name="game"
                        rules={{ required: 'El juego es requerido' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.optionsContainer}>
                                {gamesArray.map((game) => (
                                    <TouchableOpacity
                                        key={game.id}
                                        style={[
                                            styles.optionButton,
                                            selectedGames.includes(game.label) && styles.selectedButton,
                                        ]}
                                        onPress={() => toggleSelection2(game.label)}
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
                        )}
                    />
                    {errors.game && <Text style={styles.error}>{errors.game.message}</Text>}
                    <Button title="Atrás" onPress={onBack} />
                    <Button title="Siguiente" onPress={onNext} />
                </View>
                {/**paso 4 */}
                <View style={styles.slide}>
                    <Text style={styles.title}>¿CON QUÉ FRECUENCIA JUEGAS?</Text>
                    <Text style={styles.subText}>
                        Indícanos con qué frecuencia juegas para poder alinearte{"\n"}con personas que compartan tus preferencias
                    </Text>
                    <Text style={styles.label}>Frecuencia:</Text>
                    <Controller
                        control={control}
                        name="frequency"
                        rules={{ required: 'La frecuencia es requerida' }}
                        render={({ field: { onChange, onBlur, value } }) => (
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
                        )}
                    />
                    {errors.frequency && <Text style={styles.error}>{errors.frequency.message}</Text>}
                    <Button title="Atrás" onPress={onBack} />
                    <Button title="Siguiente" onPress={onNext} />
                </View>
                {/**paso 5 */}
                <View style={styles.slide}>
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
                    <Button title="Atrás" onPress={onBack} />
                    <Button title="Siguiente" onPress={onNext} />
                </View>
                {/**paso 6 */}
                <View style={styles.slide}>
                    <Text style={styles.title}>VALIDA TU INE</Text>
                    <Text style={styles.subtitle}>
                        Necesitamos validar tu identidad para asegurarnos de que eres una persona real.
                    </Text>
                    <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                                <Text style={styles.text}>Flip Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={takePhoto}>
                                <Text style={styles.text}>Take Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                    <Button title="Atrás" onPress={onBack} />
                    <Button title="Siguiente" onPress={onNext} />
                </View>
                {/**paso 7 */}
                <View style={styles.slide}>
                    <Text style={styles.title}>VALIDA TU PERSONA</Text>
                    <Text style={styles.subtitle}>
                        Necesitamos validar tu identidad para asegurarnos de que eres una persona real.
                    </Text>
                    <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                                <Text style={styles.text}>Flip Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={takePhoto}>
                                <Text style={styles.text}>Take Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.label}>Confirmación:</Text>
                    <Text style={styles.confirmText}>Verifica tus datos antes de enviar.</Text>
                    <Button title="Atrás" onPress={onBack} />
                    <Button title="Finalizar" onPress={handleSubmit(onSubmit)} />
                </View>
            </Swiper>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    label: {
        fontSize: 18,
        color: 'white'
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
    error: {
        color: 'red',
        marginBottom: 10
    },
    confirmText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 20
    }, title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    sub: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 40,
    },
    description: {
        fontSize: 10,
        marginVertical: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputWrapper: {
        flex: 1,
        padding: 4,
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
    inpu: {
        borderWidth: 1,
        marginTop: 30,
        backgroundColor: '#fff',
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
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginVertical: 20,
    },
});

export default WizardRegister;