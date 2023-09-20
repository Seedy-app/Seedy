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

  // Función para recuperar la información del usuario de AsyncStorage
  const fetchUserInfo = async () => {
    const storedUserInfo = await AsyncStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUsername(parsedInfo.username);
      setEmail(parsedInfo.email);
    }
  };

  // Función para actualizar la información del usuario en AsyncStorage
  const updateUserInfo = async () => {
    const updatedInfo = {
      username: username,
      email: email,
    };
    await AsyncStorage.setItem("userInfo", JSON.stringify(updatedInfo));
  };

  // useEffect para recuperar la información del usuario cuando se monta el componente
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSubmit = async () => {
    await updateUserInfo();
    Alert.alert("Datos actualizados", `Nombre: ${username}\nEmail: ${email}`);
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder={t("username")}
        value={username}
        onChangeText={setUsername}
      />
      <CustomInput
        placeholder={t("email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t("send")}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditProfileScreen;
