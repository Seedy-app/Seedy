import React, { useContext, useState, useEffect } from "react"; // No olvides importar useContext
import { TouchableOpacity, View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../contexts/AuthContext";
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";
import styles from "./ProfileStyles";

function EditProfileScreen() {
  const navigation = useNavigation();

  const { t } = useTranslation();

  // Estado para almacenar la información del usuario
  const [userInfo, setUserInfo] = useState({});

  // Función para recuperar la información del usuario de AsyncStorage
  const fetchUserInfo = async () => {
    const storedUserInfo = await AsyncStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  };

  // useEffect para recuperar la información del usuario cuando se monta el componente
  useEffect(() => {
    fetchUserInfo();
  }, []);
}

export default EditProfileScreen;
