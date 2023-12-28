import React, { useState, useEffect, useRef } from "react"; // No olvides importar useContext
import { Image, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  checkUsernameAvailability,
  checkEmailAvailability,
} from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./ProfileStyles";
import CustomInput from "../CustomComponents/CustomInput";
import Config from "../../config/Config";
import { selectImageFromGallery } from "../../utils/device";
import { uploadPictureToServer } from "../../utils/api";
import loadingImage from "../../assets/images/loading.gif";
import * as Sentry from '@sentry/react-native';


function EditProfileScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [user_id, setUser_id] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [displayedImageUrl, setDisplayedImageUrl] = useState(null);

  const u_timeout = useRef(null);
  const e_timeout = useRef(null);

  const fetchUserInfo = async () => {
    const storedUserInfo = await AsyncStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUsername(parsedInfo.username);
      setEmail(parsedInfo.email);
      setUser_id(parsedInfo.id);
      setPicture(parsedInfo.picture);
    }
  };

  const updateUserInfo = async (imageUrl) => {
    const updatedInfo = {
      username: username,
      email: email,
      picture: imageUrl,
      id: user_id,
    };
    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedInfo));
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo();
      if (picture) {
        const imageUrl = Config.API_URL + picture;
        setDisplayedImageUrl(imageUrl);
      }
    };
    fetchData();
  }, [picture]);

  const handleEmailChange = (text) => {
    setEmail(text);
    clearTimeout(e_timeout.current);
    e_timeout.current = setTimeout(async () => {
      const result = await checkEmailAvailability(text);
      if (result.error || result.error == "") {
        setEmailError(result.error);
      }
    }, 300);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    clearTimeout(u_timeout.current);
    u_timeout.current = setTimeout(async () => {
      const result = await checkUsernameAvailability(text, user_id);
      if (result.error || result.error == "") {
        setUsernameError(result.error);
      }
    }, 300);
  };

  const HandleSelectImage = async () => {
    try {
      const imageUri = await selectImageFromGallery();
      if (imageUri) {
        setSelectedImageUri(imageUri);
        setDisplayedImageUrl(imageUri);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error selecting the image:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        console.error(t("not_logged_in_error"));
        return { error: t("not_logged_in_error") };
      }
      const imageUrl = selectedImageUri
        ? await uploadPictureToServer(
            `pp_${Date.now()}`,
            `users/${user_id}`,
            selectedImageUri
          )
        : picture;
      const response = await fetch(`${Config.API_URL}/user/${user_id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: username,
          email: email,
          picture: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit user");
      }

      await updateUserInfo(imageUrl);
      navigation.navigate(t("show_profile"));
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error:", error.message);
    }
  };

  return (
    <View style={{ ...styles.container }}>
      {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      <CustomInput
        label={t("username")}
        value={username}
        onChangeText={handleUsernameChange}
      />
      {emailError && <Text style={styles.error}>{emailError}</Text>}
      <CustomInput
        label={t("email")}
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      <Text style={styles.label}>{t("picture") + ":"}</Text>
      <View style={styles.formPicPreviewView}>
        {displayedImageUrl ? (
          <Image
            source={{ uri: displayedImageUrl }}
            style={[styles.FormProfilePic, styles.formPicPreview]}
          />
        ) : (
          <Image
            source={loadingImage}
            style={[styles.FormProfilePic, styles.formPicPreview]}
          />
        )}
      </View>
      <Button
        mode="contained"
        onPress={HandleSelectImage}
        icon="panorama"
        style={styles.button}
      >
        {t("select_image")}
      </Button>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {t("save")}
      </Button>
    </View>
  );
}

export default EditProfileScreen;
