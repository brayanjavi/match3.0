import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const initialPayments = [
    {
        id: '1',
        name: 'Noob',
        description: 'Likes ilimitados + 5 juegos en bio',
        price: 10,
    },
    {
        id: '2',
        name: 'Mundo Abierto',
        description: 'Likes ilimitados + 6 juegos en bio,puede ver quien le dio like',
        price: 20,
    },
    {
        id: '3',
        name: 'Crack',
        description: 'Likes ilimitados + 7 juegos en bio,puede ver quien le dio like, cambiar la ubicacion geografica',
        price: 30,
    },
    {
        id: '4',
        name: 'Leyenda',
        description: 'Todo lo anterior + multiples plataformas ,filtros avanzados (horarios,etc),sin anuncios ,acceso a torneos y recompensas en juegos especificos',
        price: 40,
    },
]

export default function Payments({ navigation }) {
    const [payments, setPayments] = useState(initialPayments);



    const renderItem = ({ item }) => (
        <View style={styles.infoContainer}>
            <TouchableOpacity>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
        </View>
    )


    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/Fondo.png')} style={{ width: '100%', height: '100%' }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 40, textAlign: "center" }}>Elige tu plan</Text>
               
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={payments}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment="center"
                        decelerationRate="fast"
                        snapToInterval={width - 60}
                    />
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
    infoContainer: {
        marginTop: 40,
        marginHorizontal: 10,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: width * 0.7,
        height: height * 0.5,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    description: {
        fontSize: 18,
        color: '#000',
    },
    price: {
        fontSize: 24,
        color: '#000',
    },
});