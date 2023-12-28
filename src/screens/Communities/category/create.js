import React from "react";
import { View, Alert } from "react-native";
import styles from "../CommunitiesStyles";
import CategoryForm from "./form";
import { capitalizeFirstLetter } from "../../../utils/device";
import { useTranslation } from "react-i18next";
import { createCategory } from "../../../utils/api";
import * as Sentry from '@sentry/react-native';

const CreateCategoryScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { community_id } = route.params;

  const handleSubmit = async (name, description) => {
    try {
      const post_response = await createCategory(
        name,
        description,
        community_id
      );
      if (post_response) {
        Alert.alert(
          capitalizeFirstLetter(t("success")),
          capitalizeFirstLetter(t("succesful_category_creation_text"))
        );
        navigation.goBack();
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
    }
  };

  return (
    <View style={{ ...styles.container, justifyContent: "center" }}>
      <CategoryForm onSubmit={handleSubmit} community_id={community_id} />
    </View>
  );
};

export default CreateCategoryScreen;
