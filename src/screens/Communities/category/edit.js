import React from "react";
import { View, Alert } from "react-native";
import styles from "../CommunitiesStyles";
import CategoryForm from "./form";
import { capitalizeFirstLetter } from "../../../utils/device";
import { useTranslation } from "react-i18next";
import {
  editCategory,
} from "../../../utils/api";

const EditCategoryScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { community_id, category } = route.params;

  const handleSubmit = async (name, description) => {
    try {
      const put_response = await editCategory(
        name,
        description,
        category.id
      );
      if (put_response) {
        Alert.alert(
          capitalizeFirstLetter(t("success")),
          capitalizeFirstLetter(t("succesful_category_edition_text"))
        );
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ ...styles.container, justifyContent: "center" }}>
      <CategoryForm
        onSubmit={handleSubmit}
        community_id={community_id}
        category={category}
      />
    </View>
  );
};

export default EditCategoryScreen;
