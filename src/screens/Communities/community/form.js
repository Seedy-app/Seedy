import React, { useState, useRef, useEffect } from "react";
import { Image, View } from "react-native";
import { Text, Button } from "react-native-paper";
import CustomInput from "../../CustomComponents/CustomInput";
import { useTranslation } from "react-i18next";
import styles from "../CommunitiesStyles";
import Config from "../../../config/Config";
import { selectImageFromGallery } from "../../../utils/device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loadingImage from "../../../assets/images/loading.gif";
import { useTheme } from "react-native-paper";

import {
  checkCommunityNameAvailability,
  getRandomPicture,
} from "../../../utils/api";

function CommunityForm({ onSubmit, community = {} }) {
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [description, setDescription] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [name, setName] = useState(null);
  const [displayedImageUrl, setDisplayedImageUrl] = useState(community.picture || null);
  const [userId, setUserId] = useState(null);

  const n_timeout = useRef(null);

  const theme = useTheme();

  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        const parsedInfo = JSON.parse(storedUserInfo);
        setUserId(parsedInfo.id);
      }
    };
  
    const fetchPicture = async () => {
      if (!displayedImageUrl) {
        const picUrl = await getRandomPicture("community_picture");
        if (picUrl) {
          setDisplayedImageUrl(Config.API_URL + picUrl);
        }
      }
    };
  
    fetchUserInfo();
    fetchPicture();
  }, [displayedImageUrl]); 

  const handleCommunityNameChange = (text) => {
    setName(text);
    clearTimeout(n_timeout.current);
    n_timeout.current = setTimeout(async () => {
      const result = await checkCommunityNameAvailability(text);
      if (result.error || result.error == "") {
        setNameError(result.error);
      }
    }, 300);
  };

  const handleSelectImage = async () => {
    try {
      const imageUri = await selectImageFromGallery();
      if (imageUri) {
        setSelectedImageUri(imageUri);
        setDisplayedImageUrl(imageUri);
      }
    } catch (error) {
      console.error("Error selecting the image:", error.message);
    }
  };

  const handleSubmit = () => {
    const formData = {
      user_id: userId,
      name,
      description,
      displayedImageUrl,
      selectedImageUri,
    };

    if (community) {
      formData.community_id = community.id;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <View style={{ ...styles.container }}>
      {nameError && <Text style={styles.error}>{nameError}</Text>}
      <CustomInput label={t("name")} onChangeText={handleCommunityNameChange} />
      <CustomInput
        label={t("description")}
        onChangeText={(text) => setDescription(text)}
      />

      <Text variant="labelLarge">
        {t("picture") + " (" + t("optional") + "):"}
      </Text>
      <View style={styles.formPicPreviewView}>
        {displayedImageUrl ? (
          <Image
            source={{ uri: displayedImageUrl }}
            style={[styles.communityCreatePic, styles.formPicPreview]}
          />
        ) : (
          <Image
            source={loadingImage}
            style={[styles.FormProfilePic, styles.formPicPreview]}
          />
        )}
      </View>
      <Button
        icon="panorama"
        mode="contained"
        onPress={handleSelectImage}
        labelStyle={{ fontSize: theme.fonts.default.fontSize }}
        style={styles.button}
      >
        {t("select_image")}
      </Button>
      <Text style={styles.underInputMessage}>
        {t("no_community_image_message")}
      </Text>
      <Button mode="contained" style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t("create")}</Text>
      </Button>
    </View>
  );
}

export default CommunityForm;
