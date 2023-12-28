import React from "react";
import { ScrollView, View, Alert, Text, Image } from "react-native";
import { Button, useTheme } from "react-native-paper";
import styles from "../CommunitiesStyles";
import { useTranslation } from "react-i18next";
import { deleteUserFromCommunity } from "../../../utils/api";
import { useNavigation } from "@react-navigation/native";
import Config from "../../../config/Config";
import { capitalizeFirstLetter } from "../../../utils/device";

const InfoTab = ({ community }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();

  const handleExitCommunity = async () => {
    let response = await deleteUserFromCommunity(community.id);
    if (response) {
      navigation.navigate(t("communities_list"));
    } else {
      Alert.alert(
        capitalizeFirstLetter(t("error")),
        capitalizeFirstLetter(t("error_abandoning_community_text"))
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={{ ...styles.label, fontWeight: "bold" }}>
          {t("community_name")}:
        </Text>
        <Text>{community.name}</Text>
        <Text style={{ ...styles.label, fontWeight: "bold" }}>
          {t("description")}:
        </Text>
        <Text>{community.description}</Text>
        <Text style={{ ...styles.label, fontWeight: "bold" }}>
          {t("image")}:
        </Text>
        {community.picture && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={{ uri: Config.API_URL + community.picture }}
              style={[
                styles.FormProfilePic,
                styles.formPicPreview,
                { flex: 1, alignItems: "center" },
              ]}
            />
          </View>
        )}
          <Text style={{ ...styles.label, fontWeight: "bold" }}>
            {capitalizeFirstLetter(t("user_count"))}:
          </Text>
          <Text>{community.userCount}</Text>
        </View>
      <Button
        mode="contained"
        icon="exit-run"
        onPress={handleExitCommunity}
        buttonColor={theme.colors.danger}
        style={styles.button}
      >
        {t("abandon_community")}
      </Button>
    </ScrollView>
  );
};

export default InfoTab;
