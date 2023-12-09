import React from "react";
import styles from "./CommunitiesStyles";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { Card, IconButton, useTheme, Paragraph } from "react-native-paper";
import { capitalizeFirstLetter } from "../../utils/device";
import FontSizes from "../../config/FontSizes";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Config from "../../config/Config";
import Colors from "../../config/Colors";

const PostsTab = ({
  communityCategories,
  communityPosts,
  communityId,
  currentPostsPage,
  totalPostsPages,
  onPostsPageChange,
  fetchCommunityPosts, //No borrar! aunque no se marca se usa
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();
  const marginRightPlusIcon = Dimensions.get("window").scale * 4;

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <View style={styles.paginationContainer}>
        <IconButton
          icon="chevron-left"
          disabled={currentPage === 1}
          onPress={() => onPageChange(currentPage - 1)}
        />

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <Text
              key={page}
              style={currentPage === page ? styles.activePage : styles.page}
              onPress={() => onPageChange(page)}
            >
              {page}
            </Text>
          )
        )}

        <IconButton
          icon="chevron-right"
          disabled={currentPage === totalPages}
          onPress={() => onPageChange(currentPage + 1)}
        />
      </View>
    );
  };

  const CategoryCard = ({ category }) => (
    <Card style={{ ...styles.listCard, padding: 5 }}>
      <Card.Content>
        <Text style={styles.title}>{capitalizeFirstLetter(category.name)}</Text>
        <Text
          style={{ ...styles.communityDescription }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {capitalizeFirstLetter(category.description)}
        </Text>
      </Card.Content>
    </Card>
  );

  const PostCard = ({ post }) => (
    <Card
      style={{ ...styles.listCard }}
      onPress={() => navigation.navigate(t("view_post"), { post_id: post.id })}
    >
      <Card.Content>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={{ uri: Config.API_URL + post.user.picture }}
              style={styles.smallProfilePic}
            />
          </View>
          <View style={{ maxWidth: "80%" }}>
            <Paragraph numberOfLines={1} ellipsizeMode="tail" style={{fontSize: FontSizes.regular}}>
              {capitalizeFirstLetter(post.title)}
            </Paragraph>
            <View style={{ flexDirection: "row" }}>
              <Text style={{fontSize: FontSizes.xsmall}}>{capitalizeFirstLetter(post.category.name)}</Text>
              <Text style={{fontSize: FontSizes.xsmall}}> | </Text>
              <Text style={{ color: theme.colors.secondary, fontSize: FontSizes.xsmall }}>
                {new Date(post.createdAt).toLocaleDateString(t.language, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
              <Text style={{fontSize: FontSizes.xsmall}}> | </Text>
              <Text
                style={{
                  color: Colors[post.user.userCommunities[0].role.name],
                  fontSize: FontSizes.xsmall
                }}
              >
                {post.user.username}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

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
              iconColor={theme.colors.background}
              style={{ marginRight: marginRightPlusIcon }}
              onPress={() => {
                navigation.navigate(t("create_category"), { communityId })
              }}
            />
          </View>
        }
        scrollEnabled={false}
        data={communityCategories}
        renderItem={({ item }) => <CategoryCard category={item} />}
        keyExtractor={(item) => item.id.toString()}
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
                navigation.navigate(t("create_post"), { communityId })
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
