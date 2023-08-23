import React from "react";
import { View, Text } from "react-native";
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";

function MyPlantsScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t("my_plants")}</Text>
    </View>
  );
}

export default MyPlantsScreen;
