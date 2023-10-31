import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./PlantIdentifierStyles";


function IdentifyPlantScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t("identify_plant")}</Text>
    </View>
  );
}

export default IdentifyPlantScreen;
