// Importamos las dependencias necesarias
import React from "react";
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
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Importamos la librería de íconos FontAwesome

function CreateCommunitiesScreen() {
  const navigation = useNavigation();

  const { t } = useTranslation();

  const handleCommunityNameChange = (text) => {
    console.log(text);
  };

  const HandleSelectImage = async () => {
    try {
      const imageUrl = await selectImageFromGallery("profile_picture", `communities/${userId}`);
      setPicture(imageUrl);
    } catch (error) {
      console.error("Error selecting the image:", error);
    }
  };

  const handleSubmit = (text) => {
    console.log(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("name") + ":"}</Text>
      <CustomInput
        placeholder={t("name")}
        onChangeText={handleCommunityNameChange}
      />
      <Text style={styles.label}>{t("description") + ":"}</Text>
      <CustomInput placeholder={t("description")} />
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
