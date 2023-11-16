import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommunitiesStackNavigator from "./CommunitiesStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import PlantIdentifierStackNavigator from "./PlantIdentifierStackNavigator";
import MyPlantsStackNavigator from "./MyPlantsStackNavigator";
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

          if (route.name === "My Plants Stack Navigator") {
            iconName = "local-florist";
          } else if (route.name === "Plant Identifier Stack Navigator") {
            iconName = "group";
          } else if (route.name === "Communities Stack Navigator") {
            iconName = "search";
          } else if (route.name === "Profile Stack Navigator") {
            iconName = "person";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "limegreen",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="My Plants Stack Navigator"
        component={MyPlantsStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Plant Identifier Stack Navigator"
        component={PlantIdentifierStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Communities Stack Navigator"
        component={CommunitiesStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile Stack Navigator"
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
