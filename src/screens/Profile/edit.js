import React, { useState, useEffect, useRef } from "react"; // No olvides importar useContext
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "../../services/i18next";
import styles from "./ProfileStyles";
import CustomInput from "../CustomInput";
import Config from "../../config/Config";
import * as ImagePicker from 'expo-image-picker';
import { checkUsernameAvailability, checkEmailAvailability } from "../../utils/api";

function EditProfileScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
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

  const uploadImageToServer = async (imageUri) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: `profile-${userId}.jpg`,
      type: 'image/jpeg'
    });
  
    try {
      const response = await fetch(`${Config.API_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to upload image.');
      }
  
      setPicture(responseData.imageUrl); // Asumiendo que tu servidor devuelve un objeto con una clave "imageUrl"
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };
  

  const selectImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Necesitamos permisos para acceder a tus fotos.');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      await uploadImageToServer(result.assets[0].uri);
    }
  };
  

  const handleEmailChange = (text) => {
    setEmail(text);
    clearTimeout(e_timeout.current);
    e_timeout.current = setTimeout(async () => {
      const result = await checkEmailAvailability(t, text)
      if (result.error || result.error == "") {
        setEmailError(result.error);
      }
    }, 300);
  };

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
      {emailError && <Text style={styles.error}>{emailError}</Text>}
      <CustomInput
        placeholder={t("email")}
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      <Text style={styles.label}>{t("picture") + ":"}</Text>
      <TouchableOpacity onPress={selectImageFromGallery}>
        <Text>{t("select_image")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t("save")}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditProfileScreen;
