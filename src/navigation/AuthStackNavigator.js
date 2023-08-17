import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/Login';
import SignUpScreen from '../screens/Auth/SignUp';
import i18next from '../services/i18next';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();

function AuthStackNavigator() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name={t("login")} component={LoginScreen} />
      <Stack.Screen name={t("singup")} component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
