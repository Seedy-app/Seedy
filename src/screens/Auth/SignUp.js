import React, { useState, useRef } from "react";
import CustomInput from "../CustomInput";
import { View, Text, TouchableOpacity } from "react-native";
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";
import styles from './AuthStyles';
import Config from '../../config/Config';
import { checkUsernameAvailability } from "../../utils/api";

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

  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch(Config.API_URL+"/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.status === 409) {
        setEmailError(t("email_already_exists_error"));
      } else {
        setEmailError("");
      }
    } catch (error) {
      setError(t("network_error"));
    }
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    clearTimeout(u_timeout.current);
    u_timeout.current = setTimeout(async () => {
      const result = await checkUsernameAvailability(t, text)
      if (result.error || result.error == "") {
        setUsernameError(result.error);
      }
    }, 300);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    clearTimeout(e_timeout.current);
    e_timeout.current = setTimeout(() => {
      checkEmailAvailability(text);
    }, 300);
  };

  const register = async () => {
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
      const response = await fetch(Config.API_URL+"/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
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
    <View style={[styles.container, {justifyContent:'center'}]}>
      <Text style={styles.label}>{t("username")+":"}</Text>
      {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      <CustomInput
        placeholder={t("username")}
        onChangeText={handleUsernameChange}
      />
      <Text style={styles.label}>{t("email")+":"}</Text>
      {emailError && <Text style={styles.error}>{emailError}</Text>}
      <CustomInput
        placeholder={t("email")}
        keyboardType="email-address"
        onChangeText={handleEmailChange}
      />
      <Text style={styles.label}>{t("password")+":"}</Text>
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}
      <CustomInput
        placeholder={t("password")}
        isPassword
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.label}>{t("confirm_password")+":"}</Text>
      <CustomInput
        placeholder={t("confirm_password")}
        isConfirmPassword
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {Error && <Text style={styles.error}>{Error}</Text>}
      <TouchableOpacity
        style={[
          styles.button,
          (usernameError || emailError) && styles.buttonDisabled,
        ]}
        onPress={register}
        disabled={(usernameError || emailError) != ""}
      >
        <Text style={styles.buttonText}>{t("register")}</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>{t("already_have_an_account")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(t("login"))}>
          <Text style={styles.justTextButton}>{t("login")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


