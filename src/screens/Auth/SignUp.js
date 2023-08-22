import React, { useState, useRef } from "react";
import CustomInput from "./CustomInput";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

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
      const response = await fetch("http://192.168.0.242:3000/check-email", {
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

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch("http://192.168.0.242:3000/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.status === 409) {
        setUsernameError(t("username_already_exists_error"));
      } else {
        setUsernameError("");
      }
    } catch (error) {
      setError(t("network_error"));
    }
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    clearTimeout(u_timeout.current);
    u_timeout.current = setTimeout(() => {
      checkUsernameAvailability(text);
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
    if (!emailRegex.test(email)) {
      setEmailError(t("invalid_email_error"));
      return;
    }
    // Validación de contraseña
    if (!passwordRegex.test(password)) {
      setPasswordError(t("weak_password_error"));
      return;
    }
    try {
      const response = await fetch("http://192.168.0.242:3000/register", {
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
    <View style={styles.container}>
      {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      <CustomInput
        placeholder={t("username")}
        onChangeText={handleUsernameChange}
      />
      {emailError && <Text style={styles.error}>{emailError}</Text>}
      <CustomInput
        placeholder={t("email")}
        keyboardType="email-address"
        onChangeText={handleEmailChange}
      />
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}
      <CustomInput
        placeholder={t("password")}
        isPassword
        onChangeText={(text) => setPassword(text)}
      />
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
          <Text style={styles.loginButton}>{t("login")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  eyeIcon: {
    position: "absolute",
    transform: [{ translateX: 340 }, { translateY: 10 }],
  },
  error: {
    color: "red",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "limegreen",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  loginText: {
    marginRight: 10,
    fontSize: 16,
  },
  loginButton: {
    fontSize: 16,
    color: "blue",
  },
});
