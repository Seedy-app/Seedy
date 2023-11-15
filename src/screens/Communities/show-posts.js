import React from "react";
import styles from "./CommunitiesStyles";
import { View, Text, FlatList, Dimensions } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { capitalizeFirstLetter } from "../../utils/device";
import FontSizes from "../../config/FontSizes";
import { useTranslation } from "react-i18next";
import { useTheme } from 'react-native-paper';


const PostsTab = ({ communityCategories, communityPosts }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const marginRightPlusIcon = Dimensions.get("window").scale * 4;
  const CategoryCard = ({ category }) => (
    <Card style={{ ...styles.listCard, padding: 5 }}>
      <Card.Content>
        <Text style={styles.title}>{capitalizeFirstLetter(category.name)}</Text>
        <Text
          style={styles.communityDescription}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {capitalizeFirstLetter(category.description)}
        </Text>
      </Card.Content>
    </Card>
  );

  const PostCard = ({ post }) => (
    <Card style={{ ...styles.listCard, padding: 5 }}>
      <Card.Content>
        <Text style={styles.subtitle}>{capitalizeFirstLetter(post.title)}</Text>
        <Text style={{ fontSize: FontSizes.xsmall }}>
          {`${capitalizeFirstLetter(t("author"))}: ${post.user_id}`}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View>
      <View style={[styles.row, styles.header]}>
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
      <FlatList
        data={communityCategories}
        renderItem={({ item }) => <CategoryCard category={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={[styles.row, styles.header]}>
        <Text style={styles.headerText}>
          {capitalizeFirstLetter(t("posts"))}
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
      <FlatList
        data={communityPosts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PostsTab;
