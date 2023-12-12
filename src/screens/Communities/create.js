// Importamos las dependencias necesarias
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, View } from "react-native";
import { Text, Button } from "react-native-paper";
import CustomInput from "../CustomInput";
import { useTranslation } from "react-i18next";
import styles from "./CommunitiesStyles";
import Config from "../../config/Config";
import { selectImageFromGallery } from "../../utils/device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loadingImage from "../../assets/images/loading.gif";
import { useTheme } from "react-native-paper";

import {
  checkCommunityNameAvailability,
  changeCommunityPicture,
  createCommunity,
  getRandomPicture,
  uploadPictureToServer,
  giveUserCommunityRole,
  createCommunityCategory,
} from "../../utils/api";

function CreateCommunitiesScreen() {
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [description, setDescription] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [displayedImageUrl, setDisplayedImageUrl] = useState(null);

  const n_timeout = useRef(null);

  const theme = useTheme();

  const navigation = useNavigation();

  const { t } = useTranslation();

  // Función para recuperar la información del usuario de AsyncStorage
  const fetchUserInfo = async () => {
    const storedUserInfo = await AsyncStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUserId(parsedInfo.id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo();
    };

    const fetchPicture = async () => {
      const picUrl = await getRandomPicture("community_picture");
      if (picUrl) {
        // Asegurarse de que 'picUrl' está disponible
        setDisplayedImageUrl(Config.API_URL + picUrl);
      }
    };

    fetchData();
    fetchPicture();
  }, []);

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

  const handleSubmit = async () => {
    try {
      const community_id = await createCommunity(
        name,
        description,
        displayedImageUrl.replace(Config.API_URL, "")
      );
      await giveUserCommunityRole(userId, community_id, "community_founder");
      await createCommunityCategory(
        community_id,
        t("general"),
        t("general_category_description")
      );
      if (selectedImageUri) {
        const imageUrl = await uploadPictureToServer(
          `cp_${Date.now()}`,
          `communities/${community_id}`,
          selectedImageUri
        );
        await changeCommunityPicture(community_id, imageUrl);
      }
      navigation.navigate(t("communities_list"));
    } catch (error) {
      console.error("Error:", error.message);
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

export default CreateCommunitiesScreen;
