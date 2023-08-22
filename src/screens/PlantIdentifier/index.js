import React from "react";
import { View, Text } from "react-native";
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";

function PlantIdentifierScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t("plant_identifier")}</Text>
    </View>
  );
}

export default PlantIdentifierScreen;
