import React, { useState, useEffect } from "react"; // No olvides importar useContext
import { TouchableOpacity, View, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";
import styles from "./ProfileStyles";
import CustomInput from "../CustomInput";

function EditProfileScreen() {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  // Función para recuperar la información del usuario de AsyncStorage
  const fetchUserInfo = async () => {
    const storedUserInfo = await AsyncStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUsername(parsedInfo.username);
      setEmail(parsedInfo.email);
      setPicture(parsedInfo.picture);
    }
  };

  // Función para actualizar la información del usuario en AsyncStorage
  const updateUserInfo = async () => {
    const updatedInfo = {
      username: username,
      email: email,
      picture: picture,
    };
    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedInfo));
  };

  // useEffect para recuperar la información del usuario cuando se monta el componente
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSubmit = async () => {
    await updateUserInfo();
    Alert.alert("Datos actualizados",);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("username")+":"}</Text>
      <CustomInput
        placeholder={t("username")}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>{t("email")+":"}</Text>
      <CustomInput
        placeholder={t("email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>{t("picture")+":"}</Text>
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
