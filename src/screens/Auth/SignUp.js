import React, { useState, useRef } from "react";
import CustomInput from "../CustomInput";
import { View } from "react-native";
import { Text, Button, TouchableRipple } from "react-native-paper";
import { useTranslation } from "react-i18next";
import styles from "./AuthStyles";
import Config from "../../config/Config";
import {
  checkUsernameAvailability,
  checkEmailAvailability,
  getRandomPicture,
} from "../../utils/api";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { t } = useTranslation();

  const u_timeout = useRef(null);
  const e_timeout = useRef(null);

  const handleUsernameChange = (text) => {
    setUsername(text);
    clearTimeout(u_timeout.current);
    u_timeout.current = setTimeout(async () => {
      const result = await checkUsernameAvailability(text);
      if (result.error || result.error == "") {
        setUsernameError(result.error);
      }
    }, 300);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    clearTimeout(e_timeout.current);
    e_timeout.current = setTimeout(async () => {
      const result = await checkEmailAvailability(text);
      if (result.error || result.error == "") {
        setEmailError(result.error);
      }
    }, 300);
  };

  const register = async () => {
    let pictureUrl = "";
    if (password !== confirmPassword) {
      setPasswordError(t("unmatched_passwords_error"));
      return;
    }
    // Validación de correo electrónico
    if (!Config.EMAIL_REGEX.test(email)) {
      setEmailError(t("invalid_email_error"));
      return;
    }
    // Validación de contraseña
    if (!Config.PASSWORD_REGEX.test(password)) {
      setPasswordError(t("weak_password_error"));
      return;
    }
    try {
      pictureUrl = await getRandomPicture("profile_picture");
      const response = await fetch(Config.API_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          picture: pictureUrl,
        }),
      });
      if (response.ok) {
        navigation.navigate("Login");
      } else {
        setError(t("register_error"));
      }
    } catch (error) {
      setError(t("network_error"));
    }
  };

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      <CustomInput label={t("username")} onChangeText={handleUsernameChange} />
      {emailError && <Text style={styles.error}>{emailError}</Text>}
      <CustomInput
        label={t("email")}
        keyboardType="email-address"
        onChangeText={handleEmailChange}
      />
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}
      <CustomInput
        label={t("password")}
        isPassword
        onChangeText={(text) => setPassword(text)}
      />
      <CustomInput
        label={t("confirm_password")}
        isConfirmPassword
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {Error && <Text style={styles.error}>{Error}</Text>}
      <Button
        mode="contained"
        style={[
          (usernameError || emailError) && styles.buttonDisabled,
        ]}
        onPress={register}
        disabled={(usernameError || emailError) != ""}
      >
        <Text style={styles.buttonText}>{t("register")}</Text>
      </Button>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>{t("already_have_an_account")}</Text>
        <TouchableRipple onPress={() => navigation.navigate(t("login"))}>
          <Text style={styles.justTextButton}>{t("login")}</Text>
        </TouchableRipple>
      </View>
    </View>
  );
}
