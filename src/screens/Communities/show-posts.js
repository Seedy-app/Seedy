import React from "react";
import styles from "./CommunitiesStyles";
import { View, Text, FlatList, Dimensions, Image } from "react-native";
import { Card, IconButton, useTheme, Paragraph } from "react-native-paper";
import { capitalizeFirstLetter } from "../../utils/device";
import FontSizes from "../../config/FontSizes";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Config from "../../config/Config";
import Colors from "../../config/Colors";

const PostsTab = ({ communityCategories, communityPosts, communityId }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();
  const marginRightPlusIcon = Dimensions.get("window").scale * 4;

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
    <Card style={{ ...styles.listCard }}>
      <Card.Content>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={{ uri: Config.API_URL + post.user.picture }}
              style={styles.smallProfilePic}
            />
          </View>
          <View style={{ maxWidth: "80%" }}>
            <Paragraph numberOfLines={1} ellipsizeMode="tail">
              {capitalizeFirstLetter(post.title)}
            </Paragraph>
            <View style={{ flexDirection: "row" }}>
              <Text>{capitalizeFirstLetter(post.category.name)}</Text>
              <Text> | </Text>
              <Text style={{ color: theme.colors.secondary }}>
                {new Date(post.createdAt).toLocaleDateString(t.language, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
              <Text> | </Text>
              <Text
                style={{
                  color: Colors[post.user.userCommunities[0].role.name],
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
    <View style={styles.container}>
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
                /* acción al presionar */
              }}
            />
          </View>
        }
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
        data={communityPosts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PostsTab;
