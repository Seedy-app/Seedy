import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import CustomInput from "../CustomComponents/CustomInput";
import styles from "./AuthStyles";
import Config from "../../config/Config";
import { capitalizeFirstLetter } from "../../utils/device";
import * as Sentry from '@sentry/react-native';

export default function ChangePasswordScreen({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(Config.API_URL + "/forgot-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      if (response.status === 200) {
        navigation.navigate(t("reset_password"));
      } else if (response.status === 404) {
        Alert.alert(
          capitalizeFirstLetter(t("error")),
          t("user_not_found_error")
        );
      } else {
        Alert.alert(capitalizeFirstLetter(t("error")), t("send_email_error"));
      }
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert(capitalizeFirstLetter(t("error")), t("network_error"));
    }
  };

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <CustomInput label={t("email")} onChangeText={(text) => setEmail(text)} />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleForgotPassword}
      >
        <Text style={styles.buttonText}>{t("send")}</Text>
      </Button>
    </View>
  );
}
