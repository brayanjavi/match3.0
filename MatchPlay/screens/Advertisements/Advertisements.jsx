import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const initialAdvertisements = [
    {
        id: '1',
        image: 'https://www.roc21.com/wp-content/uploads/2014/05/publicidad-de-los-ochentas-cuatro.jpg',

    },
    {
        id: '2',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJHVLo1hRp5GLD_R-o0KuHAxhWKcGhUjht3Q&s',

    },


]
export default function Advertisements({ navigation }) {
    const [advertisements, setAdvertisements] = useState(initialAdvertisements);

    const renderItem = ({ item }) => (
        <View style={styles.infoContainer}>
            <TouchableOpacity>
                <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/Fondo.png')} style={{ width: '100%', height: '100%' }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={advertisements}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment="center"
                        decelerationRate="fast"
                        snapToInterval={width - 40}
                        contentContainerStyle={styles.scrollContainer}
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
        width: width * 0.9,
    },
    image: {
        width: width * 0.8,
        height: height * 0.9,
        borderRadius: 20,
    },
});