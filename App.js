import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import MyTabs from "./src/navigation/BottomTabsNavigator";
import { AuthContext } from "./src/contexts/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";
import SeedyTheme from "./src/config/SeedyTheme";
import * as Font from "expo-font";
import i18n from "i18next";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";

const RootStack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // token = await Notifications.getExpoPushTokenAsync({
    //   projectId: Constants.expoConfig.extra.eas.projectId,
    // });
    token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      Roboto: require("./src/assets/fonts/Roboto-Regular.ttf"),
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
