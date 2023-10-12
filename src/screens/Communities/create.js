// Importamos las dependencias necesarias
import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, View, Text, TouchableOpacity } from "react-native";
import CustomInput from "../CustomInput";
import { useTranslation } from "react-i18next";
import styles from "./CommunitiesStyles";
import Colors from "../../config/Colors";
import Config from "../../config/Config";
import { selectImageFromGallery } from "../../utils/device";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loadingImage from "../../assets/images/loading.gif";

import {
  checkCommunityNameAvailability,
  changeCommunityPicture,
  createCommunity,
  getRandomPicture,
  uploadPictureToServer,
  giveUserCommunityRole,
} from "../../utils/api";

function CreateCommunitiesScreen() {
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [description, setDescription] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [displayedImageUrl, setDisplayedImageUrl] = useState(null);

  const n_timeout = useRef(null);

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
      const picUrl = await getRandomPicture(t, "community_picture");
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
      const result = await checkCommunityNameAvailability(t, text);
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
        displayedImageUrl.replace(Config.API_URL, ""),
        userId
      );
      await giveUserCommunityRole(userId, community_id, "community_founder");
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
    <View style={styles.container}>
      <Text style={styles.label}>{t("name") + ":"}</Text>
      {nameError && <Text style={styles.error}>{nameError}</Text>}
      <CustomInput
        placeholder={t("name")}
        onChangeText={handleCommunityNameChange}
      />
      <Text style={styles.label}>{t("description") + ":"}</Text>
      <CustomInput
        placeholder={t("description")}
        onChangeText={(text) => setDescription(text)}
      />

      <Text style={styles.label}>
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
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.secondary }]}
        onPress={handleSelectImage}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="picture-o" size={16} color={Colors.white} />
          <Text style={[styles.buttonText, { marginLeft: 8 }]}>
            {t("select_image")}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.underInputMessage}>
        {t("no_community_image_message")}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t("create")}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateCommunitiesScreen;
