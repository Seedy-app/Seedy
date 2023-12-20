import React from "react";
import { View, Alert } from "react-native";
import styles from "../CommunitiesStyles";
import PostForm from "./form";
import { capitalizeFirstLetter } from "../../../utils/device";
import { useTranslation } from "react-i18next";
import {
  editPost,
} from "../../../utils/api";

const EditPostScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { user_id, community_id, post } = route.params;
  const handleSubmit = async (formData) => {
    try {
      console.log(formData)
      const put_response = await editPost(
        formData.title,
        formData.body,
        formData.category.id,
        formData.post_id
      );
      if (put_response) {
        Alert.alert(
          capitalizeFirstLetter(t("success")),
          capitalizeFirstLetter(t("succesful_post_edition_text"))
        );
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ ...styles.container, justifyContent: "center" }}>
      <PostForm
        user_id={user_id}
        onSubmit={handleSubmit}
        community_id={community_id}
        post={post}
      />
    </View>
  );
};

export default EditPostScreen;
