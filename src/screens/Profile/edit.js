import React, { useState, useEffect, useRef } from "react"; // No olvides importar useContext
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "../../services/i18next";
import styles from "./ProfileStyles";
import CustomInput from "../CustomInput";
import Config from "../../config/Config";
import { checkUsernameAvailability } from "../../utils/api";

function EditProfileScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [userId, setUserId] = useState("");

  const u_timeout = useRef(null);
  const e_timeout = useRef(null);

  // Función para recuperar la información del usuario de AsyncStorage
  const fetchUserInfo = async () => {
    const storedUserInfo = await AsyncStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUsername(parsedInfo.username);
      setEmail(parsedInfo.email);
      setPicture(parsedInfo.picture);
      setUserId(parsedInfo.id);
    }
  };

  // Función para actualizar la información del usuario en AsyncStorage
  const updateUserInfo = async () => {
    const updatedInfo = {
      username: username,
      email: email,
      picture: picture,
      id: userId,
    };
    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedInfo));
  };

  // useEffect para recuperar la información del usuario cuando se monta el componente
  useEffect(() => {
    fetchUserInfo();
  }, []);

  
  const handleUsernameChange = (text) => {
    setUsername(text);
    clearTimeout(u_timeout.current);
    u_timeout.current = setTimeout(async () => {
      const result = await checkUsernameAvailability(t, text, userId)
      if (result.error || result.error == "") {
        setUsernameError(result.error);
      }
    }, 300);
  };

  const handleSubmit = async () => {
    try {
        const response = await fetch(`${Config.API_URL}/user/${userId}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                picture,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to edit user');
        }

        await updateUserInfo();
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
      <CustomInput
        placeholder={t("email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>{t("picture") + ":"}</Text>
      <CustomInput
        placeholder={t("picture")}
        value={picture}
        onChangeText={setPicture}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t("save")}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditProfileScreen;
