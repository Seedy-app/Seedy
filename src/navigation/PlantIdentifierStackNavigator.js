// PlantIdentifierStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TakePictureScreen from "../screens/PlantIdentifier/take_picture";
import IdentifyPlantScreen from "../screens/PlantIdentifier/identify_plant";
import { useTranslation } from "react-i18next";


const PlantIdentifierStack = createStackNavigator();

function PlantIdentifierStackNavigator() {
  const { t } = useTranslation();
  return (
    <PlantIdentifierStack.Navigator initialRouteName={t("take_picture")}>
      <PlantIdentifierStack.Screen name={t("take_picture")} component={TakePictureScreen} options={{ headerShown: false }}/>
      <PlantIdentifierStack.Screen name={t("identify_plant")} component={IdentifyPlantScreen} />
    </PlantIdentifierStack.Navigator>
  );
}

export default PlantIdentifierStackNavigator;
