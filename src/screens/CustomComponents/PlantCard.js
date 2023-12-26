import React from "react";
import { View, ImageBackground } from "react-native";
import { Text, useTheme, Card, List, IconButton } from "react-native-paper";
import styles from "../../config/CommonStyles";
import { hexToRGBA, capitalizeFirstLetter } from "../../utils/device";
import { useTranslation } from "react-i18next";

const PlantCard = React.memo(({ plant, onPress, handleBellIconPress }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const onBellIconPress = () => {
    handleBellIconPress(plant);
  };

  return (
    <Card onPress={() => onPress(plant)} style={styles.plantCard}>
      <View>
        <ImageBackground
          source={{
            uri:
              JSON.parse(plant.images).length > 0
                ? JSON.parse(plant.images)[0]
                : null,
          }}
          style={styles.cardBackground}
          resizeMode="cover"
        >
          <View
            style={{
              ...styles.overlayContainer,
              backgroundColor: hexToRGBA(theme.colors.primary, 0.7),
            }}
          >
            <Card.Title
              title={plant.scientific_name}
              subtitle={
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.plantCardSubtitle}>
                    {capitalizeFirstLetter(t("family"))}:{" "}
                  </Text>
                  <Text style={styles.plantCardSubtitle}>{plant.family}</Text>
                </View>
              }
              titleStyle={styles.plantCardTitle}
            />
            <Card.Content>
              <Text style={{ ...styles.plantCardContent, fontWeight: "bold" }}>
                {capitalizeFirstLetter(t("common_names"))}:
              </Text>
              {plant.common_names.map((commonName, index) => (
                <List.Item
                  key={index}
                  title={commonName}
                  titleStyle={styles.plantCardContent}
                  left={() => <List.Icon icon="sprout" color="white" />}
                />
              ))}
            </Card.Content>
          </View>
        </ImageBackground>
        <IconButton
          icon="bell"
          iconColor={theme.colors.background}
          size={30}
          style={styles.bellIcon}
          onPress={onBellIconPress}
        />
      </View>
    </Card>
  );
});

export default PlantCard;
