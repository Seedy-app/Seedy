import React from "react";
import { Alert } from "react-native";

import { capitalizeFirstLetter } from "../../../utils/device";
import { useTranslation } from "react-i18next";

import { createPost } from "../../../utils/api";
import PostForm from "./form";
import * as Sentry from '@sentry/react-native';


const CreatePostScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { community_id } = route.params;

  const handleSubmit = async (formData={}) => {
    try {

      if (!formData.category) {
        Alert.alert(
          capitalizeFirstLetter(t("error")),
          t("no_category_selected_error")
        );
        return;
      }
      if (formData && formData.title) {
        const post_response = await createPost(
          formData.title,
          formData.body,
          formData.category.id
        );
        if (post_response) {
          Alert.alert(
            capitalizeFirstLetter(t("success")),
            capitalizeFirstLetter(t("succesful_post_text"))
          );
          navigation.goBack();
        }
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
    }
  };

  return <PostForm community_id={community_id} onSubmit={handleSubmit} />;
};

export default CreatePostScreen;
