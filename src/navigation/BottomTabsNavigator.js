// Importamos librerías y componentes.
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  // Importamos el creador de navegación de pestañas inferior
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Importamos la librería de íconos FontAwesome
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Importamos la librería de íconos MaterialCommunityIcons
import Foundation from 'react-native-vector-icons/Foundation'; // Importamos la librería de íconos Foundation

// Importamos pantallas.
import CommunitiesScreen from '../screens/Communities';
import PlantIdentifierScreen from '../screens/PlantIdentifier';
import MyPlantsScreen from '../screens/MyPlants';
import MarketScreen from '../screens/Market';
import ProfileScreen from '../screens/Profile';

// Creamos el componente BottomTabNavigator.
const Tab = createBottomTabNavigator();

// Creamos un componente de función que configura y devuelve nuestro Tab.Navigator.
function MyTabs() {
  return (
    <Tab.Navigator
      // Establecemos opciones globales para nuestras pantallas de navegación.
      screenOptions={({ route }) => ({
        // Definimos una función para mostrar un icono personalizado en cada pestaña.
        tabBarIcon: ({ color, size }) => {
          let IconComponent; // Variable para mantener el componente del ícono.
          let iconName; // Variable para mantener el nombre del ícono.

          // Dependiendo del nombre de la ruta, seleccionamos diferentes íconos.
          if (route.name === 'My Plants') {
            iconName = 'flower';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'Communities') {
            iconName = 'account-group';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'Plant identifier') {
            iconName = 'magnifying-glass';
            IconComponent = Foundation;
          } else if (route.name === 'Market') {
            iconName = 'shopping';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === 'Profile') {
            iconName = 'user';
            IconComponent = FontAwesome;
          }

          // Retornamos el componente del ícono que hemos seleccionado.
          return <IconComponent name={iconName} size={size} color={color} />;
        },
      })}
      // Configuramos opciones para la barra de pestañas.
      tabBarOptions={{
        activeTintColor: 'limegreen', // Color para el ícono de la pestaña activa.
        inactiveTintColor: 'gray', // Color para los íconos de las pestañas inactivas.
      }}
    >
      {/* Definimos las pantallas que se mostrarán para cada pestaña. */}
      <Tab.Screen name="My Plants" component={MyPlantsScreen} />
      <Tab.Screen name="Communities" component={CommunitiesScreen} />
      <Tab.Screen name="Plant identifier" component={PlantIdentifierScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Exportamos el componente MyTabs para usarlo en otros lugares de nuestra aplicación.
export default MyTabs;
