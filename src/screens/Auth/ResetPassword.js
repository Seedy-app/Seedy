import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";
import CustomInput from "./CustomInput";
import styles from './LoginStyles';

export default function ForgotPasswordScreen ({ navigation }) {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { t } = useTranslation();

    const handleResetPassword = async () => {
        // Aquí haces la solicitud POST a tu backend con el token y newPassword
        // Si es exitoso, muestra un mensaje al usuario y redirige al inicio de sesión
    };

    return (
        <View style={styles.container}>
            <CustomInput
                placeholder={t("token")}
                value={token}
                onChangeText={setToken}
            />
            <TextInput 
                placeholder={t("new_password")}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>{t("reset_password")}</Text>
            </TouchableOpacity>
        </View>
    );
}
