import React from "react";
import { View, Alert } from "react-native";
import styles from "../CommunitiesStyles";
import CategoryForm from "./form";
import { capitalizeFirstLetter } from "../../../utils/device";
import { useTranslation } from "react-i18next";
import {
  createCategory,
} from "../../../utils/api";

const CreateCategoryScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { communityId } = route.params;

  const handleSubmit = async (name, description) => {
    try {
      const post_response = await createCategory(
        name,
        description,
        communityId
      );
      if (post_response) {
        Alert.alert(
          capitalizeFirstLetter(t("success")),
          capitalizeFirstLetter(t("succesful_category_creation_text"))
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
        communityId={communityId}
      />
    </View>
  );
};

export default CreateCategoryScreen;
