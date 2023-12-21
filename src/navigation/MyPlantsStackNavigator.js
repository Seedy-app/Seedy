import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListMyPlantsScreen from "../screens/MyPlants/list";
import AddPlantScreen from "../screens/MyPlants/add_plant";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { IconButton, useTheme } from "react-native-paper";
import { Dimensions } from "react-native";

const MyPlantsStack = createStackNavigator();

function MyPlantsStackNavigator() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <MyPlantsStack.Navigator initialRouteName={t("my_plants")}>
      <MyPlantsStack.Screen
        name={t("my_plants")}
        component={ListMyPlantsScreen}
        options={{
          title: t("my_plants"),
          headerRight: () => {
            const navigation = useNavigation();
            return (
              <IconButton
                icon="plus"
                size={Dimensions.get("window").scale * 11}
                iconColor={theme.colors.primary}
                onPress={() => navigation.navigate(t("add_plant"))}
                style={{ marginRight: Dimensions.get("window").scale * 5 }}
              />
            );
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <MyPlantsStack.Screen
        name={t("add_plant")}
        component={AddPlantScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
    </MyPlantsStack.Navigator>
  );
}

export default MyPlantsStackNavigator;
