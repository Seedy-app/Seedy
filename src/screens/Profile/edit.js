import React, { useState, useEffect, useRef } from "react"; // No olvides importar useContext
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  checkUsernameAvailability,
  checkEmailAvailability,
} from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Importamos la librería de íconos FontAwesome
import styles from "./ProfileStyles";
import CustomInput from "../CustomInput";
import Config from "../../config/Config";
import Colors from "../../config/Colors";
import { selectImageFromGallery } from "../../utils/device";
import { uploadPictureToServer } from "../../utils/api";

function EditProfileScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const u_timeout = useRef(null);
  const e_timeout = useRef(null);

  // Función para recuperar la información del usuario de AsyncStorage
  const fetchUserInfo = async () => {
    const storedUserInfo = await AsyncStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUsername(parsedInfo.username);
      setEmail(parsedInfo.email);
      setUserId(parsedInfo.id);
    }
  };

  // Función para actualizar la información del usuario en AsyncStorage
  const updateUserInfo = async (imageUrl) => {
    const updatedInfo = {
      username: username,
      email: email,
      picture: imageUrl,
      id: userId,
    };
    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedInfo));
  };

  // useEffect para recuperar la información del usuario cuando se monta el componente
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleEmailChange = (text) => {
    setEmail(text);
    clearTimeout(e_timeout.current);
    e_timeout.current = setTimeout(async () => {
      const result = await checkEmailAvailability(t, text);
      if (result.error || result.error == "") {
        setEmailError(result.error);
      }
    }, 300);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    clearTimeout(u_timeout.current);
    u_timeout.current = setTimeout(async () => {
      const result = await checkUsernameAvailability(t, text, userId);
      if (result.error || result.error == "") {
        setUsernameError(result.error);
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
      const imageUrl = await uploadPictureToServer(`pp_${Date.now()}`, `users/${userId}`, selectedImageUri);
      const response = await fetch(`${Config.API_URL}/user/${userId}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
      console.error("Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("username") + ":"}</Text>
      {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      <CustomInput
        placeholder={t("username")}
        value={username}
        onChangeText={handleUsernameChange}
      />
      <Text style={styles.label}>{t("email") + ":"}</Text>
      {emailError && <Text style={styles.error}>{emailError}</Text>}
      <CustomInput
        placeholder={t("email")}
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      <Text style={styles.label}>{t("picture") + ":"}</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t("save")}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditProfileScreen;
