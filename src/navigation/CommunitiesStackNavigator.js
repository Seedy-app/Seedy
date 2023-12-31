import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommunitiesScreen from "../screens/Communities/community/index";
import CommunityScreen from "../screens/Communities/community/show";
import CreateCommunityScreen from "../screens/Communities/community/create";
import CreatePostScreen from "../screens/Communities/post/create";
import CreateCategoryScreen from "../screens/Communities/category/create";
import EditCommunityScreen from "../screens/Communities/community/edit";
import EditPostScreen from "../screens/Communities/post/edit";
import EditCategoryScreen from "../screens/Communities/category/edit";
import CommunitySettingsScreen from "../screens/Communities/settings/index";
import ViewPostScreen from "../screens/Communities/post/show";
import ListPostsScreen from "../screens/Communities/post/index";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { IconButton, useTheme } from "react-native-paper";
import { Dimensions } from "react-native";

const CommunitiesStack = createStackNavigator();

function CommunitiesStackNavigator() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <CommunitiesStack.Navigator initialRouteName={t("communities_list")}>
      <CommunitiesStack.Screen
        name={t("communities_list")}
        component={CommunitiesScreen}
        options={{
          title: t("communities"),
          headerRight: () => {
            const navigation = useNavigation();
            return (
              <IconButton
                icon="plus"
                size={Dimensions.get("window").scale * 11}
                iconColor={theme.colors.primary}
                onPress={() => navigation.navigate(t("create_community"))}
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
      <CommunitiesStack.Screen
        name={t("community")}
        component={CommunityScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("create_community")}
        component={CreateCommunityScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("edit_community")}
        component={EditCommunityScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("community_settings")}
        component={CommunitySettingsScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("create_category")}
        component={CreateCategoryScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("edit_category")}
        component={EditCategoryScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("create_post")}
        component={CreatePostScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("view_post")}
        component={ViewPostScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("list_posts")}
        component={ListPostsScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
      <CommunitiesStack.Screen
        name={t("edit_post")}
        component={EditPostScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
        }}
      />
    </CommunitiesStack.Navigator>
  );
}

export default CommunitiesStackNavigator;
