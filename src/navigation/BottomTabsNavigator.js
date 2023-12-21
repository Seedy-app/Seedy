import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommunitiesStackNavigator from "./CommunitiesStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import PlantIdentifierStackNavigator from "./PlantIdentifierStackNavigator";
import MyPlantsStackNavigator from "./MyPlantsStackNavigator";
import { useTranslation } from "react-i18next";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Importa MaterialIcons
import { useTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let color = focused ? theme.colors.primary : "grey";

          if (route.name === t("my_garden")) {
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
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { 
          borderTopColor: 'black', 
          borderTopWidth: 1, 
          borderTopStyle: 'solid',
        },
      })}
    >
      <Tab.Screen
        name={t("my_garden")}
        component={MyPlantsStackNavigator}
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
