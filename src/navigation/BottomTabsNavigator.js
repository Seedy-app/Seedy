import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import CommunitiesScreen from '../screens/Communities';
import PlantIdentifierScreen from '../screens/PlantIdentifier';
import MyPlantsScreen from '../screens/MyPlants';
import MarketScreen from '../screens/Market';
import ProfileScreen from '../screens/Profile';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let IconComponent;
          let iconName;

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
          return <IconComponent name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'limegreen',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="My Plants" component={MyPlantsScreen} />
      <Tab.Screen name="Communities" component={CommunitiesScreen} />
      <Tab.Screen name="Plant identifier" component={PlantIdentifierScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
