import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyPlantsScreen from "../screens/MyPlants";
import RemindersScreen from "../screens/MyPlants/RemindersScreen"; 
import { t } from "i18next";

const MyPlantsStack = createStackNavigator();

function MyPlantsNavigation() {
  return (
    <MyPlantsStack.Navigator initialRouteName={t("MyPlants")}>
      <MyPlantsStack.Screen
       name={t("MyPlants")}
        component={MyPlantsScreen}
        options={{ title:t("My Plants") }}
      />
      <MyPlantsStack.Screen
        name={t("RemindersScreen")}
        component={RemindersScreen}
        options={{ title:t("Reminders") }}
      />
    </MyPlantsStack.Navigator>
  );
}

export default MyPlantsNavigation;
