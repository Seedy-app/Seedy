import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";
import CustomInput from "./CustomInput";
import styles from './LoginStyles';
import Config from '../../config/Config';

export default function ForgotPasswordScreen({ navigation }) {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await fetch(Config.API_URL+'/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                navigation.navigate(t("reset_password"));
            } else {
                alert(t("send_email_error"));
            }
        } catch (error) {
            alert(t("network_error"));
        }
    };
    

    return (
        <View style={styles.container}>
            <CustomInput
                placeholder={t("email")}
                onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>{t("send")}</Text>
            </TouchableOpacity>
        </View>
    );
}
