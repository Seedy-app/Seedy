import React, { useState } from "react";
import styles from "../CommunitiesStyles";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import {
  IconButton,
  useTheme,
  Portal,
  Modal,
  Title,
  Paragraph,
  Button,
} from "react-native-paper";
import { capitalizeFirstLetter, isModerator } from "../../../utils/device";
import { migratePostsToCategory, deleteCategory, deletePost } from "../../../utils/api";
import FontSizes from "../../../config/FontSizes";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../../CustomComponents/PostCard";
import CategoryCard from "../../CustomComponents/CategoryCard";
import Pagination from "../../CustomComponents/Pagination";
import CustomInput from "../../CustomComponents/CustomInput";

const PostsTab = ({
  user_id,
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
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(allCategories);
  const [focusedCategory, setFocusedCategory] = useState(null);
  const [focusedPost, setFocusedPost] = useState(null);
  const [categoryToMigrate, setCategoryToMigrate] = useState(null);
  const [
    categoryDeleteConfirmationVisible,
    setCategoryDeleteConfirmationVisible,
  ] = useState(false);
  const [postsMigrationModalVisible, setPostsMigrationModalVisible] =
    useState(false);
  const [postsDeleteConfirmationVisible, setPostDeleteConfirmationVisible] =
    useState(false);

  const handleSearch = (query) => {
    if (allCategories) {
      const updatedList = allCategories.filter((cat) =>
        cat.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(updatedList);
    }
  };

  const handleOnLongPressCategoryCard = (category) => {
    setFocusedCategory(category);
    setCategoryModalVisible(true);
  };

  const handleOnLongPressPostCard = (post) => {
    setFocusedPost(post);
    setPostModalVisible(true);
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
                        community_id: community.id,
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
        keyExtractor={(item) => String(item.id)}
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
                  community_id: community.id,
                })
              }
            />
          </View>
        }
        scrollEnabled={false}
        data={communityPosts}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            community_id={community.id}
            userRole={userRole}
            onLongPressAction={handleOnLongPressPostCard}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        ListFooterComponent={
          <Pagination
            currentPage={currentPostsPage}
            totalPages={totalPostsPages}
            onPageChange={onPostsPageChange}
          />
        }
      />
      <Portal>
        {/* Modal de opciones de la categoria */}
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
                icon="eye"
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
                    icon="pencil"
                    onPress={() => {
                      setCategoryModalVisible(false);
                      navigation.navigate(t("edit_category"), {
                        community_id: community.id,
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
                    icon="trash-can"
                    onPress={async () => {
                      if (!focusedCategory) {
                        return;
                      }
                      let response = await fetchCommunityCategories(
                        0,
                        0,
                        (changeStates = false)
                      );
                      if (
                        !response.categories ||
                        response.categories.length < 2
                      ) {
                        Alert.alert(
                          capitalizeFirstLetter(t("attention")),
                          t("minimum_categories_error")
                        );
                      } else {
                        if (
                          focusedCategory &&
                          focusedCategory.postCount === 0
                        ) {
                          setCategoryDeleteConfirmationVisible(true);
                        } else {
                          if (response && response.categories) {
                            setAllCategories(response.categories);
                            setFilteredCategories(response.categories);
                            setPostsMigrationModalVisible(true);
                          } else {
                            Alert.alert(
                              capitalizeFirstLetter(t("error")),
                              t("fetch_categories_error")
                            );
                          }
                        }
                      }
                    }}
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
        {/* Modal para confirmar la eliminación de una categoría */}
        <Modal
          visible={categoryDeleteConfirmationVisible}
          onDismiss={() => setCategoryDeleteConfirmationVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.title}>
              {capitalizeFirstLetter(t("confirm_delete"))}
            </Text>
            <View style={styles.modalTextContainer}>
              {categoryToMigrate && (
                <Text>
                  {capitalizeFirstLetter(
                    `${t("post_migration_text")}: ${categoryToMigrate?.name}`
                  )}
                </Text>
              )}
              <Text>{capitalizeFirstLetter(t("are_you_sure_delete"))}</Text>
            </View>
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={async () => {
                  if (!focusedCategory) {
                    return;
                  }
                  var could_migrate = false;
                  if (categoryToMigrate) {
                    could_migrate = await migratePostsToCategory(
                      focusedCategory.id,
                      categoryToMigrate.id
                    );
                  }
                  if (could_migrate || !categoryToMigrate) {
                    let could_delete = await deleteCategory(focusedCategory.id);
                    if (could_delete) {
                      setFilteredCategories([]);
                      setCategoryModalVisible(false);
                      fetchCommunityCategories(currentCategoriesPage);
                      fetchCommunityPosts(currentPostsPage);
                      Alert.alert(
                        capitalizeFirstLetter(t("success")),
                        t("category_deleted_success")
                      );
                    } else {
                      Alert.alert(
                        capitalizeFirstLetter(t("error")),
                        t("category_deleted_error")
                      );
                    }
                  } else {
                    Alert.alert(
                      capitalizeFirstLetter(t("error")),
                      t("post_migration_error")
                    );
                  }
                  setCategoryDeleteConfirmationVisible(false);
                }}
                style={styles.button}
                buttonColor={theme.colors.danger}
              >
                {capitalizeFirstLetter(t("yes"))}
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  setCategoryDeleteConfirmationVisible(false);
                  setCategoryToMigrate(null);
                  setCategoryModalVisible(true);
                }}
                style={styles.button}
              >
                {capitalizeFirstLetter(t("no"))}
              </Button>
            </View>
          </View>
        </Modal>
        {/* Modal para migrar posts */}
        <Modal
          visible={postsMigrationModalVisible}
          onDismiss={() => setPostsMigrationModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <IconButton
            icon="close"
            size={20}
            onPress={() => setPostsMigrationModalVisible(false)}
            style={styles.modalCloseButton}
          />
          <View style={styles.modalContent}>
            <Text style={styles.title}>
              {capitalizeFirstLetter(t("migrate_posts"))}
            </Text>
            <View style={styles.modalTextContainer}>
              <Text>{capitalizeFirstLetter(t("where_to_migrate_posts"))}</Text>
            </View>
            <CustomInput
              label={capitalizeFirstLetter(t("search_category"))}
              onChangeText={handleSearch}
            />
            <ScrollView>
              {filteredCategories &&
                filteredCategories
                  .filter((cat) => cat.id !== focusedCategory.id)
                  .slice(0, 5)
                  .map((cat, index) => (
                    <Button
                      key={index}
                      onPress={() => {
                        setCategoryToMigrate(cat);
                        setPostsMigrationModalVisible(false);
                        setCategoryModalVisible(false);
                        setCategoryDeleteConfirmationVisible(true);
                      }}
                      mode="text"
                      textColor="black"
                    >
                      {capitalizeFirstLetter(cat.name)}
                    </Button>
                  ))}
            </ScrollView>
          </View>
        </Modal>
        {/* Modal de opciones del post */}
        <Modal
          visible={postModalVisible}
          onDismiss={() => setPostModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <IconButton
            icon="close"
            size={20}
            onPress={() => setPostModalVisible(false)}
            style={styles.modalCloseButton}
          />
          <View style={styles.modalContent}>
            <View style={{ marginBottom: "5%" }}>
              <View>
                <Title style={styles.title}>
                  {focusedPost && capitalizeFirstLetter(focusedPost.title)}
                </Title>
              </View>
            </View>
            <View>
              <Button
                mode="contained"
                style={styles.button}
                icon="eye"
                onPress={() => {
                  setPostModalVisible(false);
                  navigation.navigate(t("view_post"), {
                    post_id: focusedPost.id,
                    community_id: community.id,
                    userRole,
                  });
                }}
              >
                <Text style={styles.buttonText}>
                  {capitalizeFirstLetter(t("view_post"))}
                </Text>
              </Button>
              {focusedPost &&
                (user_id == focusedPost.user.id || isModerator(userRole)) && (
                  <View>
                    <Button
                      mode="contained"
                      style={styles.button}
                      icon="pencil"
                      onPress={() => {
                        setPostModalVisible(false);
                        navigation.navigate(t("edit_post"), {
                          user_id: user_id,
                          community_id: community.id,
                          post: focusedPost,
                        });
                      }}
                    >
                      <Text style={styles.buttonText}>
                        {capitalizeFirstLetter(t("edit_post"))}
                      </Text>
                    </Button>
                    <Button
                      mode="contained"
                      style={styles.button}
                      icon="trash-can"
                      buttonColor={theme.colors.danger}
                      onPress={async () => {
                        setPostDeleteConfirmationVisible(true);
                      }}
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
        {/* Modal de alerta de eliminacion del post */}
        <Modal
          visible={postsDeleteConfirmationVisible}
          onDismiss={() => setPostDeleteConfirmationVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.title}>
              {capitalizeFirstLetter(t("confirm_delete"))}
            </Text>
            <View style={styles.modalTextContainer}>
              <Text>{capitalizeFirstLetter(t("are_you_sure_delete"))}</Text>
            </View>
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={async () => {
                  let could_delete = await deletePost(focusedPost.id);
                  if (could_delete) {
                    setPostModalVisible(false);
                    fetchCommunityCategories(currentCategoriesPage);
                    fetchCommunityPosts(currentPostsPage);
                    Alert.alert(
                      capitalizeFirstLetter(t("success")),
                      t("post_deleted_success")
                    );
                  } else {
                    Alert.alert(
                      capitalizeFirstLetter(t("error")),
                      t("post_deleted_error")
                    );
                  }
                  setPostDeleteConfirmationVisible(false);
                }}
                style={styles.button}
                buttonColor={theme.colors.danger}
              >
                {capitalizeFirstLetter(t("yes"))}
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  setPostDeleteConfirmationVisible(false);
                  setPostModalVisible(true);
                }}
                style={styles.button}
              >
                {capitalizeFirstLetter(t("no"))}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default PostsTab;
