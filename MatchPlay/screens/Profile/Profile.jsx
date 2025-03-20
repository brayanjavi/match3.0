import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Profile ({ route, navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.profileText}>PERFIL</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={width * 0.08} color="#FF8A00" />
        </TouchableOpacity>
      </View>

      {/* User Info Section */}
      <View style={styles.userInfoSection}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZA1tDcHTLzM4kr1a5uYu-WMYwpFrnFpKI5g&s' }} // Imagen de ejemplo
          style={styles.profileImage}
        />
        <Text style={styles.userName}>ROGER 25</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>EDITAR PERFIL</Text>
        </TouchableOpacity>
      </View>

      {/* PC Button */}
      <TouchableOpacity style={styles.pcButton}>
        <Text style={styles.pcButtonText}>PC</Text>
      </TouchableOpacity>

      {/* Match & Play Premium Section */}
      <View style={styles.premiumSection}>
        <Text style={styles.premiumTitle}>MATCH &</Text>
        <Text style={styles.premiumTitle}>PLAY</Text>
        <Text style={styles.premiumSubtitle}>PREMIUM</Text>
        <TouchableOpacity style={styles.premiumButton}>
          <Text style={styles.premiumButtonText}>LO QUIERO</Text>
        </TouchableOpacity>
      </View>

      {/* Perks Section */}
      <View style={styles.perksSection}>
        <Text style={styles.perksTitle}>PERKS</Text>
        <Text style={styles.perkItem}>LIKES ILIMITADOS</Text>
        <Text style={styles.perkItem}>10 JUEGOS EN BIO</Text>
        <Text style={styles.perkItem}>VER QUIEN TE DA LIKE</Text>
        <Text style={styles.perkItem}>CAMBIO DE UBICACIÓN GEOGRÁFICA</Text>
        <Text style={styles.perkItem}>MULTIPLES PLATAFORMAS</Text>
        <Text style={styles.perkItem}>FILTROS AVANZADOS</Text>
        <Text style={styles.perkItem}>SIN ANUNCIOS</Text>
        <Text style={styles.perkItem}>ACCESO A TORNEOS Y RECOMPENSAS</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.05,
  },
  profileText: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: width * 0.02,
  },
  userInfoSection: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  profileImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    marginBottom: height * 0.01,
  },
  userName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginTop: height * 0.01,
  },
  editProfileButton: {
    backgroundColor: '#ddd',
    paddingVertical: height * 0.008,
    paddingHorizontal: width * 0.05,
    borderRadius: 20,
    marginTop: height * 0.01,
  },
  editProfileText: {
    fontSize: width * 0.035,
  },
  pcButton: {
    backgroundColor: '#FF8A00',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: height * 0.03,
  },
  pcButtonText: {
    fontSize: width * 0.05,
    color: 'white',
    fontWeight: 'bold',
  },
  premiumSection: {
    backgroundColor: '#FFE0B2',
    marginTop: height * 0.04,
    borderRadius: 30,
    paddingVertical: height * 0.03,
    alignItems: 'center',
    marginHorizontal: width * 0.05,
  },
  premiumTitle: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  premiumSubtitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF8A00',
  },
  premiumButton: {
    backgroundColor: 'white',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.15,
    borderRadius: 30,
    marginTop: height * 0.02,
  },
  premiumButtonText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  perksSection: {
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.05,
  },
  perksTitle: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  perkItem: {
    fontSize: width * 0.045,
    marginBottom: height * 0.01,
  },
});

