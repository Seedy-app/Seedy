import React, { useState } from 'react';
import CustomInput from './CustomInput';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import i18next from '../../services/i18next';
import { useTranslation } from 'react-i18next';


export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const { t } = useTranslation();


  const checkEmailAvailability = async (email) => {
    const response = await fetch('http://192.168.0.242:3000/check-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (response.status === 409) {
      setEmailError(t("email_already_exists_error")); 
    } else {
      setEmailError('');
    }
  };

  const checkUsernameAvailability = async (username) => {
    const response = await fetch('http://192.168.0.242:3000/check-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (response.status === 409) {
      setUsernameError(t("username_already_exists_error")); 
    } else {
      setUsernameError('');
    }
  };


  let u_timeout;
  const handleUsernameChange = (text) => {
    setUsername(text);
    clearTimeout(u_timeout);
    u_timeout = setTimeout(() => {
      checkUsernameAvailability(text);
    }, 300);
  };

  let e_timeout;
  const handleEmailChange = (text) => {
    setEmail(text);
    clearTimeout(e_timeout);
    e_timeout = setTimeout(() => {
      checkEmailAvailability(text);
    }, 300);
  };

  const register = async () => {
    if (password !== confirmPassword) {
      setError(t("unmatched_passwords_error"));
      return;
    }
    // Validación de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError(t("invalid_email_error"));
      return;
    }
    // Validación de contraseña
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(t("weak_password_error"));
      return;
    }
    const response = await fetch('http://192.168.0.242:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    if (response.ok) {
      // La cuenta ha sido creada y puedes navegar a la pantalla de inicio de sesión
      navigation.navigate('Login');
    } else {
      setError(t("register_error"));
    }
  };

  return (
    <View style={styles.container}>
      {usernameError && <Text style={{color: 'red'}}>{usernameError}</Text>}
      <CustomInput placeholder={t("username")} onChangeText={handleUsernameChange} />
      {emailError && <Text style={{color: 'red'}}>{emailError}</Text>}
      <CustomInput placeholder={t("email")} keyboardType="email-address" onChangeText={handleEmailChange} />
      <CustomInput placeholder={t("password")} isPassword onChangeText={text => setPassword(text)} />  
      <CustomInput placeholder={t("confirm_password")} isConfirmPassword onChangeText={text => setConfirmPassword(text)} />  
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>{t("register")}</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>{t("already_have_an_account")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(t('login'))}>
          <Text style={styles.loginButton}>{t("login")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  eyeIcon: {
    position: 'absolute',
    transform: [{ translateX: 340 }, { translateY: 10 }],
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'limegreen',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  loginText: {
    marginRight: 10,
    fontSize: 16,
  },
  loginButton: {
    fontSize: 16,
    color: 'blue',
  },
});
