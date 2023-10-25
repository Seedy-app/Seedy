import React from "react";
import styles from "./CommunitiesStyles";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { capitalizeFirstLetter } from "../../utils/device";

const PostsTab = ({ communityCategories }) => {
  const CategoryCard = ({ category }) => (
    <TouchableOpacity style={{...styles.listCard, padding: 5}}>
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

  return (
    <View>
      <View style={[styles.row, styles.viewBorders]}>
        <Text>New category</Text>
      </View>
      <View style={[styles.row, styles.viewBorders]}>
        <FlatList
          data={communityCategories}
          renderItem={({ item }) => <CategoryCard category={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={[styles.row, styles.viewBorders]}>
        <Text>New posts</Text>
      </View>
      <View style={[styles.row, styles.viewBorders]}>
        <Text>Posts</Text>
      </View>
    </View>
  );
};

export default PostsTab;
