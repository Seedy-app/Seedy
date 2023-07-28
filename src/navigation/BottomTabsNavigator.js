import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import CommunitiesScreen from '../screens/Communities';
import PlantIdentifierScreen from '../screens/PlantIdentifier';
import MyPlantsScreen from '../screens/MyPlants';
import MarketScreen from '../screens/Market';
import ProfileScreen from '../screens/Profile';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Plants" component={MyPlantsScreen} />
      <Tab.Screen name="Communities" component={CommunitiesScreen} />
      <Tab.Screen name="Plant identifier" component={PlantIdentifierScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
