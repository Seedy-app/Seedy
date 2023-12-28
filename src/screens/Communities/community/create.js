import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "../CommunitiesStyles";
import Config from "../../../config/Config";
import CommunityForm from "./form";
import * as Sentry from '@sentry/react-native';


import {
  changeCommunityPicture,
  createCommunity,
  uploadPictureToServer,
  giveUserCommunityRole,
  createCommunityCategory,
} from "../../../utils/api";

function CreateCommunitiesScreen() {
  const navigation = useNavigation();

  const { t } = useTranslation();

  const handleSubmit = async (formData) => {
    try {
      const community_id = await createCommunity(
        formData.name,
        formData.description,
        formData.displayedImageUrl.replace(Config.API_URL, "")
      );
      await giveUserCommunityRole(
        formData.user_id,
        community_id,
        "community_founder"
      );
      await createCommunityCategory(
        community_id,
        t("general"),
        t("general_category_description")
      );
      if (formData.selectedImageUri) {
        const imageUrl = await uploadPictureToServer(
          `cp_${Date.now()}`,
          `communities/${community_id}`,
          formData.selectedImageUri
        );
        await changeCommunityPicture(community_id, imageUrl);
      }
      navigation.navigate(t("communities_list"));
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error:", error.message);
    }
  };

  return (
    <View style={{ ...styles.container, justifyContent: "center" }}>
      <CommunityForm onSubmit={handleSubmit} />
    </View>
  );
}

export default CreateCommunitiesScreen;
