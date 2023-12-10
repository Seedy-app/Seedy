import React from "react";
import styles from "./CommunitiesStyles";
import { View, Text, FlatList, Dimensions, ScrollView } from "react-native";
import { Card, IconButton, useTheme, Paragraph } from "react-native-paper";
import { capitalizeFirstLetter } from "../../utils/device";
import FontSizes from "../../config/FontSizes";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import PostCard from "./components/PostCard";
import CategoryCard from "./components/CategoryCard";
import Pagination from "./components/Pagination";

const PostsTab = ({
  userRole,
  communityCategories,
  communityPosts,
  community,
  currentPostsPage,
  totalPostsPages,
  onPostsPageChange,
  fetchCommunityPosts, //No borrar! aunque no se marca se usa
  currentCategoriesPage,
  totalCategoriesPages,
  onCategoriesPageChange,
  fetchCommunityCategories, //No borrar! aunque no se marca se usa
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();
  const marginRightPlusIcon = Dimensions.get("window").scale * 4;

  return (
    <ScrollView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View
            style={{
              ...styles.row,
              ...styles.header,
              backgroundColor: theme.colors.primary,
            }}
          >
            <Text style={styles.headerText}>
              {capitalizeFirstLetter(t("categories"))}
            </Text>
            <IconButton
              icon="plus"
              size={FontSizes.large}
              iconColor={
                userRole &&
                ["community_founder", "community_moderator"].includes(
                  userRole.name
                )
                  ? theme.colors.background
                  : theme.colors.primary
              }
              style={{ marginRight: marginRightPlusIcon }}
              onPress={
                userRole &&
                ["community_founder", "community_moderator"].includes(
                  userRole.name
                )
                  ? () => {
                      navigation.navigate(t("create_category"), {
                        communityId: community.id,
                      });
                    }
                  : null
              }
            />
          </View>
        }
        scrollEnabled={false}
        data={communityCategories}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            community={community}
            currentCategoriesPage={currentCategoriesPage}
            currentPostsPage={currentPostsPage}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          <Pagination
            currentPage={currentCategoriesPage}
            totalPages={totalCategoriesPages}
            onPageChange={onCategoriesPageChange}
          />
        }
      />

      <FlatList
        ListHeaderComponent={
          <View
            style={{
              ...styles.row,
              ...styles.header,
              backgroundColor: theme.colors.primary,
            }}
          >
            <Text style={styles.headerText}>
              {capitalizeFirstLetter(t("posts"))}
            </Text>
            <IconButton
              icon="plus"
              size={FontSizes.large}
              iconColor={theme.colors.background}
              style={{ marginRight: marginRightPlusIcon }}
              onPress={() =>
                navigation.navigate(t("create_post"), {
                  communityId: community.id,
                })
              }
            />
          </View>
        }
        scrollEnabled={false}
        data={communityPosts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          <Pagination
            currentPage={currentPostsPage}
            totalPages={totalPostsPages}
            onPageChange={onPostsPageChange}
          />
        }
      />
    </ScrollView>
  );
};

export default PostsTab;
