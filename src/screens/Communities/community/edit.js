import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "../CommunitiesStyles";
import Config from "../../../config/Config";
import CommunityForm from "./form";
import * as Sentry from "@sentry/react-native";

import {
  uploadPictureToServer,
} from "../../../utils/api";

function EditCommunitiesScreen({ route, navigation }) {

  const { t } = useTranslation();
  const { community } = route.params;

  const handleSubmit = async (
    name,
    description,
    selectedImageUri = null,
    community
  ) => {
    try {
      if (displayedImageUrl) {
        const imageUrl = await uploadPictureToServer(
          `cp_${Date.now()}`,
          `communities/${community_id}`,
          selectedImageUri
        );
      }
      const put_response = await editCommunity(
        name,
        description,
        imageUrl,
        community.id
      );
      if (put_response) {
        Alert.alert(
          capitalizeFirstLetter(t("success")),
          capitalizeFirstLetter(t("succesful_community_edition_text"))
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
      <CommunityForm onSubmit={handleSubmit} community={community} />
    </View>
  );
}

export default EditCommunitiesScreen;
