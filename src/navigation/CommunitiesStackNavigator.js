// CommunitiesStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommunitiesScreen from "../screens/Communities/list";
import CommunityScreen from "../screens/Communities/show";
import CreateCommunityScreen from "../screens/Communities/create";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Colors from "../config/Colors";
import FontSizes from "../config/FontSizes";
import FontAwesome from "react-native-vector-icons/FontAwesome"; 

const CommunitiesStack = createStackNavigator();

function CommunitiesStackNavigator() {
  const { t } = useTranslation();
  return (
    <CommunitiesStack.Navigator initialRouteName={t("communities_list")}>
      <CommunitiesStack.Screen
        name={t("communities_list")}
        component={CommunitiesScreen}
        options={{
          title:t("communities"),
          headerRight: () => {
            const navigation = useNavigation();
            return (
              <FontAwesome
                name="plus"
                size={FontSizes.large}
                color={Colors.primary}
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate(t("create_community"))}
              />
            );
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("community")}
        component={CommunityScreen}
      />
      <CommunitiesStack.Screen
        name={t("create_community")}
        component={CreateCommunityScreen}
      />
    </CommunitiesStack.Navigator>
  );
}

export default CommunitiesStackNavigator;
