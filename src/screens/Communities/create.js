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
import {
  checkCommunityNameAvailability,
  changeCommunityPicture,
  createCommunity,
  getRandomPicture,
  uploadPictureToServer,
} from "../../utils/api";

function CreateCommunitiesScreen() {
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [description, setDescription] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [name, setName] = useState(null);
  const [displayedImageUrl, setDisplayedImageUrl] = useState(null);


  const n_timeout = useRef(null);

  const navigation = useNavigation();

  const { t } = useTranslation();

  useEffect(() => {
    const fetchPicture = async () => {
      const picUrl = await getRandomPicture("community_picture");
      setDisplayedImageUrl(Config.API_URL + picUrl);
    };
    clearTimeout(n_timeout.current);
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
      setSelectedImageUri(imageUri);
      setDisplayedImageUrl(imageUri);
    } catch (error) {
      console.error("Error selecting the image:", error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const community_id = await createCommunity(name, description, displayedImageUrl.replace(Config.API_URL, ""));
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
          <Text>{t("loading_image")}</Text>
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
