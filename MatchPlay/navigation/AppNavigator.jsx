import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//drawer
/* import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; */

//Views
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import Login from '../screens/Login/Login';
import Advertisements from '../screens/Advertisements/Advertisements';
import GamingPlatform from '../screens/Registerpeople/Gaming_Platform';
import Payments from '../screens/Payments/Payments';
import Register from '../screens/Registerpeople/Register';
import Welcome from '../screens/Registerpeople/Welcome';
import ValidateINE from '../screens/Registerpeople/validateINE';
import ValidatePerson from '../screens/Registerpeople/validatePerson';
import Conversations from '../screens/Conversations/Conversations';
import WizardSolicitud from '../screens/Registerpeople/WIzardSolicitud';
import FavoriteGame from '../screens/Registerpeople/Favorite_Game';
import Frequency from '../screens/Registerpeople/Frequency';
import PhoneNumber from '../screens/Registerpeople/Phone_Number';
import CodeVerification from '../screens/Registerpeople/CodeVerification';
import ProfileScreen from '../screens/Profile/Profile';
import ImageUploadScreen from '../screens/Registerpeople/ImageUploadScreen';
import Chat from '../screens/Conversations/Chats';
import WizardRegister from '../screens/Registerpeople/WizardRegister';
//creacion de un stack

const Stack = createNativeStackNavigator();

//Creacion de un drawer
/* const Drawer = createDrawerNavigator();
const { Navigator, Screen } = Drawer;
 */
/* export default function MainStack() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );

} */

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio', headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalles', headerShown: false }} />
      <Stack.Screen name="Advertisements" component={Advertisements} options={{ title: 'Anuncios', headerShown: false }} />
      <Stack.Screen name="Payments" component={Payments} options={{ title: 'Pagos', headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Bienvenido', headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ title: 'Registro', headerShown: false }} />
      <Stack.Screen name="WizardSolicitud" component={WizardSolicitud} options={{ title: 'Registro', headerShown: false }} />
      <Stack.Screen name="ValidateINE" component={ValidateINE} options={{ title: 'Validar INE', headerShown: false }} />
      <Stack.Screen name="ValidatePerson" component={ValidatePerson} options={{ title: 'Validar Persona', headerShown: false }} />
      <Stack.Screen name="Conversations" component={Conversations} options={{ title: 'Conversaciones', headerShown: false }} />
      <Stack.Screen name="GamingPlatform" component={GamingPlatform} options={{ title: 'Plataforma de Juegos', headerShown: false }} />
      <Stack.Screen name="FavoriteGame" component={FavoriteGame} options={{ title: 'Juego Favorito', headerShown: false }} />
      <Stack.Screen name="Frequency" component={Frequency} options={{ title: 'Frecuencia', headerShown: false }} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{ title: 'Número de Teléfono', headerShown: false }} />
      <Stack.Screen name="CodeVerification" component={CodeVerification} options={{ title: 'Verificación de Código', headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil', headerShown: false }} />
      <Stack.Screen name="ImageUpload" component={ImageUploadScreen} options={{ title: 'Subir Fotos', headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} options={{ title: 'Chat', headerShown: false }} />
      <Stack.Screen name="WizardRegister" component={WizardRegister} options={{ title: 'Registro', headerShown: false }} />
    </Stack.Navigator>
  );
}
