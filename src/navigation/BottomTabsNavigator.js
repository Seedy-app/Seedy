import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommunitiesStackNavigator from "./CommunitiesStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import PlantIdentifierStackNavigator from "./PlantIdentifierStackNavigator";
import MyPlantsScreen from "../screens/MyPlants";
import { useTranslation } from "react-i18next";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Importa MaterialIcons

const Tab = createBottomTabNavigator();

function MyTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === t("my_plants")) {
            iconName = "local-florist";
          } else if (route.name === t("communities")) {
            iconName = "group";
          } else if (route.name === t("plant_identifier")) {
            iconName = "search";
          } else if (route.name === t("profile")) {
            iconName = "person";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "limegreen",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name={t("my_plants")}
        component={MyPlantsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={t("plant_identifier")}
        component={PlantIdentifierStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={t("communities")}
        component={CommunitiesStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={t("profile")}
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
