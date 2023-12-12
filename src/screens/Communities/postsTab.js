import React, { useState } from "react";
import styles from "./CommunitiesStyles";
import { View, Text, FlatList, Dimensions, ScrollView } from "react-native";
import {
  IconButton,
  useTheme,
  Portal,
  Modal,
  Title,
  Paragraph,
  Button,
} from "react-native-paper";
import { capitalizeFirstLetter, isModerator } from "../../utils/device";
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
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [focusedCategory, setFocusedCategory] = useState(null);

  const handleOnLongPressCategoryCard = (category) => {
    setFocusedCategory(category);
    setCategoryModalVisible(true);
  };

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
                userRole && isModerator(userRole)
                  ? theme.colors.background
                  : theme.colors.primary
              }
              style={{ marginRight: marginRightPlusIcon }}
              onPress={
                userRole && isModerator(userRole)
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
            onLongPressAction={handleOnLongPressCategoryCard}
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
      <Portal>
        <Modal
          visible={categoryModalVisible}
          onDismiss={() => setCategoryModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <IconButton
            icon="close"
            size={20}
            onPress={() => setCategoryModalVisible(false)}
            style={styles.modalCloseButton}
          />
          <View style={styles.modalContent}>
            <View style={{ marginBottom: "5%" }}>
              <View>
                <Title style={styles.title}>
                  {focusedCategory &&
                    capitalizeFirstLetter(focusedCategory.name)}
                </Title>
                <Paragraph>
                  {focusedCategory && focusedCategory.description}
                </Paragraph>
              </View>
              <View style={styles.postCount}>
                <Text style={styles.postCountText}>{`${capitalizeFirstLetter(
                  t("posts")
                )}: ${focusedCategory && focusedCategory.postCount}`}</Text>
              </View>
            </View>
            <View>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => {
                  setCategoryModalVisible(false);
                  navigation.navigate(t("list_posts"), {
                    community,
                    category: focusedCategory,
                    currentCategoriesPage,
                    currentPostsPage,
                  });
                }}
              >
                <Text style={styles.buttonText}>
                  {capitalizeFirstLetter(t("enter_category"))}
                </Text>
              </Button>
              {isModerator(userRole) && (
                <View>
                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => {
                      setCategoryModalVisible(false);
                      navigation.navigate(t("edit_category"), {
                        communityId: community.id,
                        category: focusedCategory,
                      });
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {capitalizeFirstLetter(t("edit_category"))}
                    </Text>
                  </Button>
                  <Button
                    mode="contained"
                    style={styles.button}
                    buttonColor={theme.colors.danger}
                  >
                    <Text style={styles.buttonText}>
                      {capitalizeFirstLetter(t("delete_category"))}
                    </Text>
                  </Button>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default PostsTab;
