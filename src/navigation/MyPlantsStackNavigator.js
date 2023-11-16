// PlantIdentifierStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListMyPlantsScreen from "../screens/MyPlants/list";
import { useTranslation } from "react-i18next";

const MyPlantsStack = createStackNavigator();

function MyPlantsStackNavigator() {
  const { t } = useTranslation();
  return (
    <MyPlantsStack.Navigator initialRouteName={t("my_plants")}>
      <MyPlantsStack.Screen
        name={t("my_plants")}
        component={ListMyPlantsScreen}
      />
    </MyPlantsStack.Navigator>
  );
}

export default MyPlantsStackNavigator;
