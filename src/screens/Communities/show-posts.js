import React from "react";
import styles from "./CommunitiesStyles";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { capitalizeFirstLetter } from "../../utils/device";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../../config/Colors";
import FontSizes from "../../config/FontSizes";
import { useTranslation } from "react-i18next";

const PostsTab = ({ communityCategories, communityPosts }) => {
  const { t } = useTranslation();

  const CategoryCard = ({ category }) => (
    <TouchableOpacity style={{ ...styles.listCard, padding: 5 }}>
      <View style={styles.communityShortInfo}>
        <Text style={styles.title}>{capitalizeFirstLetter(category.name)}</Text>
        <Text
          style={styles.communityDescription}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {capitalizeFirstLetter(category.description)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const PostCard = ({ post }) => (
    <TouchableOpacity style={{ ...styles.listCard, padding: 5 }}>
      <View style={styles.communityShortInfo}>
        <Text style={styles.subtitle}>{capitalizeFirstLetter(post.title)}</Text>
        <Text style={{ fontSize: FontSizes.xsmall }}>{`${capitalizeFirstLetter(
          t("author")
        )}: ${post.user_id}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={[styles.row, styles.header]}>
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.headerText}>
            {capitalizeFirstLetter(t("categories"))}
          </Text>
        </View>
        <View>
          <FontAwesome
            name="plus"
            size={FontSizes.large}
            color={Colors.white}
            style={{ marginRight: 10 }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <FlatList
          data={communityCategories}
          renderItem={({ item }) => <CategoryCard category={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={[styles.row, styles.header]}>
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.headerText}>
            {capitalizeFirstLetter(t("posts"))}
          </Text>
        </View>
        <View>
          <FontAwesome
            name="plus"
            size={FontSizes.large}
            color={Colors.white}
            style={{ marginRight: 10 }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <FlatList
          data={communityPosts}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default PostsTab;
