import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home';
import CommunitiesScreen from '../screens/Communities';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Communities" component={CommunitiesScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
