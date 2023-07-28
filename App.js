import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/navigation/BottomTabsNavigator';

function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;
