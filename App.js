import React, { useState, useEffect, createContext, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import MyTabs from "./src/navigation/BottomTabsNavigator";
import { AuthContext } from "./src/contexts/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";
import SeedyTheme from "./src/config/SeedyTheme";

// Crea el stack de navegación de nivel superior
const RootStack = createStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Cargar el token al inicio de la aplicación
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem("userToken");
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

  if (isLoading) {
    // Puedes mostrar una pantalla de carga mientras se recupera el token
    return null; // Reemplaza esto con tu pantalla de carga
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
