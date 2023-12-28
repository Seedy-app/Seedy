import React from "react";
import { View, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "../CommunitiesStyles";
import Config from "../../../config/Config";
import CommunityForm from "./form";
import * as Sentry from "@sentry/react-native";
import { editCommunity } from "../../../utils/api";
import { capitalizeFirstLetter } from "../../../utils/device";


function EditCommunitiesScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { community } = route.params;

  const handleSubmit = async (formData) => {
    try {
      const put_response = await editCommunity(
        formData.name,
        formData.description,
        community.id,
        formData.displayedImageUrl.replace(Config.API_URL, ""),
      );
      if (put_response) {
        community.name = formData.name;
        community.description = formData.description;
        community.picture = formData.displayedImageUrl.replace(Config.API_URL, "");
        Alert.alert(
          capitalizeFirstLetter(t("success")),
          capitalizeFirstLetter(t("succesful_community_edition_text"))
        );
        navigation.navigate(t("community"), { community });
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
