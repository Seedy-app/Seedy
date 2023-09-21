// CommunitiesStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommunitiesScreen from "../screens/Communities/list";
import CommunityScreen from "../screens/Communities/show";
import { useTranslation } from "react-i18next";


const CommunitiesStack = createStackNavigator();

function CommunitiesStackNavigator() {
  const { t } = useTranslation();
  return (
    <CommunitiesStack.Navigator initialRouteName={t("communities_list")}>
      <CommunitiesStack.Screen name={t("communities_list")} component={CommunitiesScreen} options={{
    headerShown: false
  }}/>
      <CommunitiesStack.Screen name={t("community")} component={CommunityScreen} />
    </CommunitiesStack.Navigator>
  );
}

export default CommunitiesStackNavigator;
