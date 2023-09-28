// Importamos las dependencias necesarias
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import CustomInput from "../CustomInput";
import { useTranslation } from "react-i18next";
import styles from "./CommunitiesStyles";
import Colors from "../../config/Colors";
import { selectImageFromGallery } from "../../utils/device";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { checkCommunityNameAvailability } from "../../utils/api";

function CreateCommunitiesScreen() {
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [description, setDescription] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [name, setName] = useState(null);

  const n_timeout = useRef(null);

  const navigation = useNavigation();

  const { t } = useTranslation();

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

  const HandleSelectImage = async () => {
    try {
      const imageUri = await selectImageFromGallery();
      setSelectedImageUri(imageUri);
    } catch (error) {
      console.error("Error selecting the image:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${Config.API_URL}/communities/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create community.");
      }

      response = await fetch(`${Config.API_URL}/communities/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create community.");
      }

      const imageUrl = await uploadPictureToServer(`pp_${Date.now()}`, `users/${userId}`, selectedImageUri);

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
      <CustomInput placeholder={t("description")} onChangeText={(text) => setDescription(text)}/>
      <Text style={styles.label}>{t("picture") + " (" + t("optional") + "):"}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.secondary }]}
        onPress={HandleSelectImage}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="picture-o" size={16} color={Colors.white} />
          <Text style={[styles.buttonText, { marginLeft: 8 }]}>
            {t("select_image")}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.underInputMessage}>{t("no_community_image_message")}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t("create")}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateCommunitiesScreen;
