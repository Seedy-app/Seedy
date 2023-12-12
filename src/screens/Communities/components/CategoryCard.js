import React from "react";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import styles from "../CommunitiesStyles";
import { capitalizeFirstLetter } from "../../../utils/device";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ category, community, currentCategoriesPage, currentPostsPage, onLongPressAction }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Card
      style={{ ...styles.listCard, padding: 5 }}
      onPress={() => {
        navigation.navigate(t("list_posts"), {
          category,
          community,
          currentCategoriesPage,
          currentPostsPage
        });
      }}
      onLongPress={() => {
        if (onLongPressAction) {
          onLongPressAction(category);
        }
      }}
    >
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
};

export default CategoryCard;
