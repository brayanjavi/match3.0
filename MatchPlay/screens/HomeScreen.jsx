import React, { useState } from 'react';
import { set } from 'react-hook-form';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const initialPeopel = [
    {
        id: '1',
        name: 'ROGER',
        age: 25,
        platform: 'PC',
        games: 'AGE OF EMPIRES 2, CODWZ',
        bio: 'Me gusta jugar partidas largas de aeo2 y soy super rusher en codwz',
        Image: 'https://www.ecured.cu/images/a/ad/Gamers.jpg'
    },
    {
        id: '2',
        name: 'JUAN',
        age: 20,
        platform: 'PC',
        games: 'AGE OF EMPIRES 2, CODWZ',
        bio: 'Me gusta jugar partidas largas de aeo2 y soy super rusher en codwz',
        Image: 'https://i4.cloudfable.net/styles/550x550/119.109/Black/gamer-jugador-de-videojuegos-ninos-adolescentes-hombres-camiseta-de-manga-larga-20240409052227-un3npaow-s7.jpg'
    },
    {
        id: '3',
        name: 'NAOMI',
        age: 25,
        platform: 'PC',
        games: 'AGE OF EMPIRES 2, CODWZ',
        bio: 'Me gusta jugar partidas largas de aeo2 y soy super rusher en codwz',
        Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcECr5a2_SEu4xDyWnc3y58qSa8pnOfs7HZQ&s'
    },
];

export default function HomeScreen({ navigation }) {
    const [people, setPeople] = useState(initialPeopel);
    const [userlike, setUserLike] = useState(0);
    const [userdislike, setUserDislike] = useState(0);

    const renderItem = ({ item }) => (
        <View style={styles.infoContainer}>
            <Image source={{ uri: item.Image }} style={styles.image} />
            <Text style={styles.name}>{item.name} {item.age}</Text>
            <Text style={styles.platform}>{item.platform}</Text>
            <Text style={styles.games}>{item.games}</Text>
            <Text style={styles.bio}>{item.bio}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/Fondo.png')} style={{ width: '100%', height: '100%' }}>

                <View style={{ flex: 1 }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment="center"
                        decelerationRate="fast"
                        snapToInterval={windowWidth - 40}
                        data={people}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.scrollContainer}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    {/**boton perfil - Soldadito */}
                    <View >
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
                            <Image source={require('../assets/perfil.png')} style={styles.button} />
                        </TouchableOpacity>
                    </View>
                    {/**boton rechazar - espadas */}
                    <View>
                        <TouchableOpacity style={styles.button} onPress={()=> setUserDislike(userdislike + 1)}>
                            <Image source={require('../assets/Logo.png')} style={styles.button} />
                        </TouchableOpacity>
                    </View>
                    {/**boton maches - Corazon */}
                    <View>
                        <TouchableOpacity style={styles.button} onPress={()=> setUserLike(userlike + 1)}>
                            <Image source={require('../assets/matches.png')} style={styles.button} />
                        </TouchableOpacity>
                    </View>
                    {/**boton chat - Pantalla conversaciones*/}
                    <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.button}>
                            <Image source={require('../assets/conversacion.png')} style={styles.button} />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    infoContainer: {
        marginTop: 40,
        marginHorizontal: 10,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: windowWidth * 0.9,
        height: windowHeight * 0.8,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF6600',
    },
    platform: {
        fontSize: 16,
        color: '#333',
    },
    games: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 5,
    },
    bio: {
        fontSize: 16,
        color: '#000',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: windowHeight * 0.5,
        borderRadius: 10,
    },
    button: {
        //backgroundColor: '#FF6600',
        //padding: 10,
        //borderRadius: 10,
        width: windowWidth * 0.1,
        height: windowHeight * 0.08,
        //justifyContent: 'center',
        // marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});