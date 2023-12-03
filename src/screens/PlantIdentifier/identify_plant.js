import React, { useState, useEffect } from "react";
import { ScrollView, Image, View, Alert } from "react-native";
import { Card, Button, Text, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import styles from "./PlantIdentifierStyles";
import { capitalizeFirstLetter } from "../../utils/device";
import {
  associatePlantToUser,
  firstOrCreatePlant,
  isPlantAssociatedWithMe,
} from "../../utils/api";

function IdentifyPlantScreen({ route, navigation }) {
  const { results } = route.params;
  const { t } = useTranslation();
  const theme = useTheme();
  const [resultNumber, setResultNumber] = useState(0);
  const [plantId, setPlantId] = useState(null);
  const [userHasPlant, setUserHasPlant] = useState(false);

  useEffect(() => {
    const updatePlantId = async () => {
      const newPlantId = await firstOrCreatePlant(results[resultNumber]);
      setPlantId(newPlantId);
    };

    updatePlantId();
  }, [resultNumber, results]);

  useEffect(() => {
    const checkIfUserHasPlant = async () => {
      if (plantId) {
        const hasPlant = await isPlantAssociatedWithMe(plantId);
        setUserHasPlant(hasPlant);
      }
    };

    checkIfUserHasPlant();
  }, [plantId]);

  const HandleAddToMyPlants = async () => {
    associated_code = await associatePlantToUser(plantId);
    switch (associated_code) {
      case 1:
        setUserHasPlant(true);
        break;
      case 0:
        Alert.alert(
          t("duplicated_plant"),
          t("duplicated_plant_message"),
          [
            {
              text: t("try_again"),
            },
          ],
          { cancelable: false }
        );
        break;
      case -1:
        Alert.alert(
          t("unexpected_error_title"),
          t("unexpected_error_message"),
          [
            {
              text: t("try_again"),
            },
          ],
          { cancelable: false }
        );
        break;
      default:
        break;
    }
  };

  const ChangeResultNumber = async () => {
    const newResultNumber = (resultNumber + 1) % results.length;
    setResultNumber(newResultNumber);
  };

  const image_urls = results[resultNumber].images.map((image) => image.url.o);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.section}>
          <Text style={styles.title}>
            {capitalizeFirstLetter(t("scientific_name")) + ":"}
          </Text>
          <Text style={styles.contentText}>
            {results[resultNumber].species.scientificNameWithoutAuthor}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>
            {capitalizeFirstLetter(t("family")) + ":"}
          </Text>
          <Text style={styles.contentText}>
            {results[resultNumber].species.family.scientificNameWithoutAuthor}
          </Text>
        </View>

        {results[resultNumber].species.commonNames &&
          results[resultNumber].species.commonNames.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>
                {capitalizeFirstLetter(t("common_names")) + ":"}
              </Text>
              {results[resultNumber].species.commonNames.map(
                (element, index) => (
                  <Text style={styles.contentText} key={index}>
                    {element}
                  </Text>
                )
              )}
            </View>
          )}

        <View style={styles.section}>
          <Text style={styles.title}>
            {capitalizeFirstLetter(t("images")) + ":"}
          </Text>
          {/* Aquí puedes incluir las imágenes o lo que corresponda */}
        </View>
      </Card.Content>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row" }}>
          {image_urls.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.plantPic} />
          ))}
        </View>
      </ScrollView>
      <Card.Actions style={{ flexDirection: "column" }}>
        <Button
          mode="contained"
          onPress={HandleAddToMyPlants}
          disabled={userHasPlant}
          style={styles.button}
        >
          {userHasPlant ? t("duplicated_plant_message") : t("add_to_my_plants")}
        </Button>
        <Button
          mode="contained"
          buttonColor={theme.colors.error}
          onPress={ChangeResultNumber}
          style={styles.button}
        >
          {t("wrong_identification")}
        </Button>
      </Card.Actions>
    </Card>
  );
}

export default IdentifyPlantScreen;
