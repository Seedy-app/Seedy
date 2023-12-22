import React from "react";
import { View, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import styles from "../CommunitiesStyles";
import { useTranslation } from "react-i18next";
import { deleteUserFromCommunity } from "../../../utils/api";
import { useNavigation } from "@react-navigation/native";

const InfoTab = ({ community }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();

  const handleExitCommunity = async () => {
    let response = await deleteUserFromCommunity(community.id);
    if (response){
    navigation.navigate(t("communities_list"));
    }else{
      Alert.alert(
        capitalizeFirstLetter(t("error")),
        capitalizeFirstLetter(t("error_abandoning_community_text"))
      );
    }
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        icon="exit-run"
        onPress={handleExitCommunity}
        buttonColor={theme.colors.danger}
        style={styles.button}
      >
        {t("abandon_community")}
      </Button>
    </View>
  );
};

export default InfoTab;
