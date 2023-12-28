import React, { useState, useLayoutEffect } from "react";
import { View, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import CustomInput from "../CustomComponents/CustomInput";
import styles from "./AuthStyles";
import Config from "../../config/Config";
import { capitalizeFirstLetter } from "../../utils/device";
import * as Sentry from "@sentry/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangePasswordScreen({ navigation, route }) {
  const { isLoggedIn = false } = route.params || {};
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [Error, setError] = useState("");
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isLoggedIn ?t("change_password") : t("reset_password"),
    });
  }, []);

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError(t("unmatched_passwords_error"));
      return;
    }

    if (!Config.PASSWORD_REGEX.test(newPassword)) {
      setPasswordError(t("weak_password_error"));
      return;
    }
    try {
      const endpoint = isLoggedIn ? "/change-password" : "/reset-password";
      let headers = {
        "Content-Type": "application/json",
      };
      const payload = isLoggedIn
        ? { newPassword: newPassword }
        : { token: token, newPassword: newPassword };
      if (isLoggedIn) {
        const bearer_token = await AsyncStorage.getItem("userToken");

        if (!bearer_token) {
          console.error(t("not_logged_in_error"));
        } else {
          headers["Authorization"] = `Bearer ${bearer_token}`;
        }
      }
      const response = await fetch(Config.API_URL + endpoint, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 200) {
        if (isLoggedIn) {
          Alert.alert(
            capitalizeFirstLetter(t("success")),
            t("password_modify_successful")
          );
          navigation.navigate(t("show_profile"));
        } else {
          Alert.alert(
            capitalizeFirstLetter(t("success")),
            t("password_reset_successful")
          );
          navigation.navigate(t("login"));
        }
      } else {
        setError(data.message || t("password_reset_error"));
      }
    } catch (error) {
      Sentry.captureException(error);
      setError(t("network_error"));
    }
  };

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      {!isLoggedIn && (
        <CustomInput label={t("token")} value={token} onChangeText={setToken} />
      )}
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}
      <CustomInput
        label={t("new_password")}
        isPassword
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
      />
      <CustomInput
        label={t("confirm_new_password")}
        value={confirmNewPassword}
        isConfirmPassword
        onChangeText={setConfirmNewPassword}
        secureTextEntry={true}
      />
      {Error && <Text style={styles.error}>{Error}</Text>}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>{isLoggedIn ?t("change_password") : t("reset_password")}</Text>
      </Button>
    </View>
  );
}
