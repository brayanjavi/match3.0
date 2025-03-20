import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform // Importa Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');

const matches = [
  { id: '1', name: 'Itzel', image: require('../../assets/gato.jpg')},
  { id: '2', name: 'Xim Quinn', image: require('../../assets/gato.jpg')},
  { id: '3', name: 'Sandra', image: require('../../assets/gato.jpg')},
  { id: '4', name: 'Addi', image: require('../../assets/gato.jpg')},
];

const messages = [
  { id: '1', name: 'Ximena', message: 'Holis', image: require('../../assets/gato.jpg'), matchId: '1'},
  { id: '2', name: 'Brook', message: 'Holis', image: require('../../assets/gato.jpg'), matchId: '2' },
  { id: '3', name: 'Adriana', message: 'Holis', image: require('../../assets/gato.jpg'), matchId: '3' },
  { id: '4', name: 'Hannah', message: 'Holis', image: require('../../assets/gato.jpg'), matchId: '4' },
  { id: '5', name: 'Ang', message: 'Holis', image: require('../../assets/gato.jpg'), matchId: '1' },
];

export default function Chat({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/Fondo.png')} style={styles.image}>
        <Text style={styles.header}>Chats</Text>
        <Text style={styles.sectionTitle}>Me gusta y matches</Text>
        <FlatList
          horizontal
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.matchItem} onPress={() => navigation.navigate('Conversations', { match: item })}>
              {item.image ? (
                <Image source={item.image} style={styles.matchImage} />
              ) : (
                <View style={styles.matchImagePlaceholder}>
                  <Text style={styles.matchName}>{item.name}</Text>
                </View>
              )}
              <Text style={styles.matchName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.sectionTitle}>Mensajes</Text>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.messageItem} onPress={() => navigation.navigate('Conversations', { match: matches.find(m => m.id === item.matchId) })}>
              {item.image ? (
                <Image source={item.image} style={styles.messageImage} />
              ) : (
                <View style={styles.messageImagePlaceholder}>
                  <Text style={styles.messageName}>{item.name}</Text>
                </View>
              )}
              <View style={styles.messageContent}>
                <Text style={styles.messageName}>{item.name}</Text>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
    paddingHorizontal: width * 0.05, // 5% del ancho para margen horizontal
    paddingVertical: height * 0.02,   // 2% del alto para margen vertical
  },
  header: {
    fontSize: width * 0.08,   // 8% del ancho para el tamaño de la fuente
    fontWeight: 'bold',
    marginBottom: height * 0.01, // 1% del alto para el margen inferior
  },
  sectionTitle: {
    fontSize: width * 0.05,   // 5% del ancho para el tamaño de la fuente
    fontWeight: 'bold',
    marginTop: height * 0.02,  // 2% del alto para el margen superior
    marginBottom: height * 0.01, // 1% del alto para el margen inferior
  },
  matchItem: {
    alignItems: 'center',
    marginRight: width * 0.04,  // 4% del ancho para el margen derecho
  },
  matchImage: {
    width: width * 0.15,  // 15% del ancho para el ancho de la imagen
    height: width * 0.15, // 15% del ancho para el alto de la imagen (mantener cuadrado)
    borderRadius: width * 0.075, // La mitad del ancho para hacerlo circular
  },
  matchImagePlaceholder: {
    width: width * 0.15,  // 15% del ancho para el ancho del placeholder
    height: width * 0.15, // 15% del ancho para el alto del placeholder (mantener cuadrado)
    borderRadius: width * 0.075, // La mitad del ancho para hacerlo circular
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchName: {
    fontSize: width * 0.03,   // 3% del ancho para el tamaño de la fuente
    marginTop: height * 0.005, // 0.5% del alto para el margen superior
    textAlign: 'center',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.012, // 1.2% del alto para el padding vertical
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  messageImage: {
    width: width * 0.12,  // 12% del ancho para el ancho de la imagen
    height: width * 0.12, // 12% del ancho para el alto de la imagen
    borderRadius: width * 0.06, // La mitad del ancho para hacerlo circular
    marginRight: width * 0.02, // 2% del ancho para el margen derecho
  },
  messageImagePlaceholder: {
    width: width * 0.12,  // 12% del ancho para el ancho del placeholder
    height: width * 0.12, // 12% del ancho para el alto del placeholder
    borderRadius: width * 0.06, // La mitad del ancho para hacerlo circular
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.02, // 2% del ancho para el margen derecho
  },
  messageContent: {
    flex: 1,
  },
  messageName: {
    fontSize: width * 0.04,   // 4% del ancho para el tamaño de la fuente
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: width * 0.035, // 3.5% del ancho para el tamaño de la fuente
    color: 'gray',
  },
});