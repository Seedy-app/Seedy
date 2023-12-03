// CommunitiesStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Profile/show";
import EditProfileScreen from "../screens/Profile/edit";
import { useTranslation } from "react-i18next";

const ProfileStack = createStackNavigator();

function ProfileStackNavigator() {
  const { t } = useTranslation();
  return (
    <ProfileStack.Navigator initialRouteName={t("show_profile")}>
      <ProfileStack.Screen
        name={t("show_profile")}
        component={ProfileScreen}
        options={{
          title: t("profile"),
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <ProfileStack.Screen
        name={t("edit_profile")}
        component={EditProfileScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigator;
