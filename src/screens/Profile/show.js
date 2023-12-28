import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, ScrollView, RefreshControl } from "react-native";
import { AuthContext } from "../../../src/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./ProfileStyles";
import Config from "../../config/Config";
import { Button, Text, Menu, useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

function ProfileScreen() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { signOut } = useContext(AuthContext);
  const theme = useTheme();

  const [userInfo, setUserInfo] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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

  useFocusEffect(
    React.useCallback(() => {
      fetchUserInfo();
    }, [])
  );

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    signOut();
  };

  const changeLanguage = async (language) => {
    i18n.changeLanguage(language);
    await AsyncStorage.setItem("selectedLanguage", language);
    setIsMenuVisible(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ ...styles.profileContainer }}>
        <Image
          source={{ uri: Config.API_URL + userInfo.picture }}
          style={{ ...styles.largeProfilePic }}
        />
        <View style={{ ...styles.userInfo }}>
          <Text
            variant="titleLarge"
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.title}
          >
            {userInfo.username}
          </Text>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={styles.email}
          >
            {userInfo.email}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: "5%" }}>
        <Button
          mode="contained"
          icon="pencil"
          onPress={() => navigation.navigate(t("edit_profile"))}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{t("edit_profile")}</Text>
        </Button>
        <Button
          mode="contained"
          icon="lock"
          onPress={() =>
            navigation.navigate(t("reset_password"), { isLoggedIn: true })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>{t("change_password")}</Text>
        </Button>
        <Menu
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          anchor={
            <Button
              mode="contained"
              icon="translate"
              onPress={() => setIsMenuVisible(true)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{t("change_language")}</Text>
            </Button>
          }
        >
          <Menu.Item onPress={() => changeLanguage("es")} title="Español" />
          <Menu.Item onPress={() => changeLanguage("en")} title="English" />
        </Menu>

        <Button
          mode="contained"
          onPress={logout}
          icon="logout"
          buttonColor={theme.colors.danger}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{t("logout")}</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
