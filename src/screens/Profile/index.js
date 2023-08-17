import React, { useContext } from 'react'; // No olvides importar useContext
import { Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../src/contexts/AuthContext';
import i18next from '../../services/i18next';
import { useTranslation } from 'react-i18next';

function ProfileScreen() {
  const { t } = useTranslation();
  const { signOut } = useContext(AuthContext); // Crea una instancia del contexto

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    // Aquí actualizamos el estado de la aplicación para reflejar que el usuario ha cerrado la sesión
    signOut();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{t('profile')}</Text>
      <Button title={t('logout')} onPress={logout} />
    </View>
  );
}

export default ProfileScreen;
