import { CameraView, useCameraPermissions } from "expo-camera"
import { useState, useRef } from "react"
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ValidatePerson = ({ navigation }) => {
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

    return (
        <View style={styles.container}>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        width: windowWidth * 1,
        height: windowHeight * 0.7,

    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center"
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white"
    }
});

export default ValidatePerson;