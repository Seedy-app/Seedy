// PlantIdentifierStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TakePictureScreen from "../screens/PlantIdentifier/take_picture";
import IdentifyPlantScreen from "../screens/PlantIdentifier/identify_plant";
import { useTranslation } from "react-i18next";


const ProfileStack = createStackNavigator();

function PlantIdentifierStackNavigator() {
  const { t } = useTranslation();
  return (
    <ProfileStack.Navigator initialRouteName={t("take_picture")}>
      <ProfileStack.Screen name={t("take_picture")} component={TakePictureScreen} options={{title:t("take_picture")}}/>
      <ProfileStack.Screen name={t("identify_plant")} component={IdentifyPlantScreen} />
    </ProfileStack.Navigator>
  );
}

export default PlantIdentifierStackNavigator;
