import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import MyTabs from "./src/navigation/BottomTabsNavigator";
import { AuthContext } from "./src/contexts/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";
import SeedyTheme from "./src/config/SeedyTheme";
import * as Font from 'expo-font';
import i18n from "i18next";

const RootStack = createStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'Roboto': require('./src/assets/fonts/Roboto-Regular.ttf'),
    });
    setFontsLoaded(true); 
  }

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem("userToken");
        const selectedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (selectedLanguage) {
          i18n.changeLanguage(selectedLanguage);
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
      setUserToken(token);
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (token) => {
      setIsLoading(false);
      setUserToken(token);
    },
    signOut: async () => {
      setIsLoading(false);
      setUserToken(null);
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userInfo");
    },
  };

  if (isLoading || !fontsLoaded) {
    return null; 
  }

  return (
    <PaperProvider theme={SeedyTheme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <RootStack.Navigator>
            {userToken != null ? (
              <RootStack.Screen
                name="BottomTabsNavigator"
                component={MyTabs}
                options={{ headerShown: false }}
              />
            ) : (
              <RootStack.Screen
                name="AuthStackNavigator"
                component={AuthStackNavigator}
                options={{ headerShown: false }}
              />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

export default App;
