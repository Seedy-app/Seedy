import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, ScrollView, RefreshControl } from "react-native";
import { AuthContext } from "../../../src/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./ProfileStyles";
import Config from "../../config/Config";
import { Button, Text } from "react-native-paper";

function ProfileScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { signOut } = useContext(AuthContext); // Crea una instancia del contexto

  // Estado para almacenar la información del usuario
  const [userInfo, setUserInfo] = useState({});
  const [refreshing, setRefreshing] = useState(false); // Nuevo estado para el refresco

  // Función para recuperar la información del usuario de AsyncStorage
  const fetchUserInfo = async () => {
    const storedUserInfo = await AsyncStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserInfo();
    setRefreshing(false);
  };

  // useEffect para recuperar la información del usuario cuando se monta el componente
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    // Aquí actualizamos el estado de la aplicación para reflejar que el usuario ha cerrado la sesión
    signOut();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: Config.API_URL + userInfo.picture }}
          style={styles.largeProfilePic}
        />
        <View style={styles.userInfo}>
          <Text variant="titleLarge" style={styles.title}>
            {userInfo.username}
          </Text>
          <Text style={styles.email}>{userInfo.email}</Text>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(t("edit_profile"))}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{t("edit_profile")}</Text>
      </Button>

      <Button mode="contained" onPress={logout} style={styles.button}>
        <Text style={styles.buttonText}>{t("logout")}</Text>
      </Button>
    </ScrollView>
  );
}

export default ProfileScreen;
