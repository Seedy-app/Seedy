import React, { useState, useContext } from "react";
import CustomInput from "../CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { Text, Button, TouchableRipple } from "react-native-paper";
import { AuthContext } from "../../../src/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import styles from "./AuthStyles";
import Config from "../../config/Config";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const { t } = useTranslation();

  const login = async () => {
    const response = await fetch(Config.API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      const data = await response.json(); // Parsea la respuesta a JSON
      const token = data.token;
      const userInfo = data.userInfo;
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      // Actualiza el estado de la aplicación para reflejar que el usuario ha iniciado sesión
      signIn(token);
    } else {
      console.error("Invalid credentials");
    }
  };

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <CustomInput
        label={t("username")}
        onChangeText={(text) => setUsername(text)}
      />
      <CustomInput
        label={t("password")}
        isPassword
        onChangeText={(text) => setPassword(text)}
      />
      <Button mode="contained" style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>{t("login")}</Text>
      </Button>
      <View style={styles.otherOptionsContainer}>
        <Text style={styles.registerText}>{t("dont_have_an_account")}</Text>
        <TouchableRipple onPress={() => navigation.navigate(t("singup"))}>
          <Text style={styles.justTextButton}>{t("singup")}</Text>
        </TouchableRipple>
      </View>
      <View style={styles.otherOptionsContainer}>
        <Text style={styles.registerText}>{t("forgot_your_password")}</Text>
        <TouchableRipple
          onPress={() => navigation.navigate(t("forgot_your_password"))}
        >
          <Text style={styles.justTextButton}>{t("reset_it")}</Text>
        </TouchableRipple>
      </View>
    </View>
  );
}
