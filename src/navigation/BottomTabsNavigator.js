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

import i18next from '../services/i18next';
import { useTranslation } from 'react-i18next';

// Creamos el componente BottomTabNavigator.
const Tab = createBottomTabNavigator();

// Creamos un componente de función que configura y devuelve nuestro Tab.Navigator.
function MyTabs() {
  const {t}  = useTranslation();
  
  return (
    <Tab.Navigator
      // Establecemos opciones globales para nuestras pantallas de navegación.
      screenOptions={({ route }) => ({
        // Definimos una función para mostrar un icono personalizado en cada pestaña.
        tabBarIcon: ({ color, size }) => {
          let IconComponent; // Variable para mantener el componente del ícono.
          let iconName; // Variable para mantener el nombre del ícono.

          // Dependiendo del nombre de la ruta, seleccionamos diferentes íconos.
          if (route.name === t('my_plants')) {
            iconName = 'flower';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === t('communities')) {
            iconName = 'account-group';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === t('plant_identifier')) {
            iconName = 'magnifying-glass';
            IconComponent = Foundation;
          } else if (route.name === t('market')) {
            iconName = 'shopping';
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === t('profile')) {
            iconName = 'user';
            IconComponent = FontAwesome;
          }

          // Retornamos el componente del ícono que hemos seleccionado.
          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'limegreen', // Color para el ícono de la pestaña activa.
        tabBarInactiveTintColor: 'gray', // Color para los íconos de las pestañas inactivas.
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}
    >
      {/* Definimos las pantallas que se mostrarán para cada pestaña. */}
      
      <Tab.Screen name={t('my_plants')} component={MyPlantsScreen} />
      <Tab.Screen name={t('communities')} component={CommunitiesScreen} />
      <Tab.Screen name={t('plant_identifier')} component={PlantIdentifierScreen} />
      <Tab.Screen name={t('market')} component={MarketScreen} />
      <Tab.Screen name={t('profile')} component={ProfileScreen} />
    </Tab.Navigator>
  );
}


// Exportamos el componente MyTabs para usarlo en otros lugares de nuestra aplicación.
export default MyTabs;
