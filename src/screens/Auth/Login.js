import React, { useState, useContext } from "react";
import CustomInput from "./CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../../../src/contexts/AuthContext";
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";
import styles from './LoginStyles';
import Config from '../../config/Config';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const { t } = useTranslation();

  const login = async () => {
    const response = await fetch(Config.API_URL+"/login", {
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
      const token = await response.text();
      await AsyncStorage.setItem("userToken", token);
      // Actualiza el estado de la aplicación para reflejar que el usuario ha iniciado sesión
      signIn(token);
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder={t("username")}
        onChangeText={(text) => setUsername(text)}
      />
      <CustomInput
        placeholder={t("password")}
        isPassword
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>{t("login")}</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>{t("dont_have_an_account")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(t("singup"))}>
          <Text style={styles.registerButton}>{t("singup")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


