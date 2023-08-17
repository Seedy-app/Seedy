import React from 'react';
import { View, Text } from 'react-native';
import i18next from '../../services/i18next';
import { useTranslation } from 'react-i18next';

function CommunitiesScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{t('communities')}</Text>
    </View>
  );
}

export default CommunitiesScreen;
