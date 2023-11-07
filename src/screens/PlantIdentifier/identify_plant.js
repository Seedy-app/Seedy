import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./PlantIdentifierStyles";
import { capitalizeFirstLetter } from "../../utils/device";
import Colors from "../../config/Colors";

function IdentifyPlantScreen({ route }) {
  const { results } = route.params;
  const { t } = useTranslation();
  const [resultNumber, setResultNumber] = useState(0);

  const ChangeResultNumber = async () => {
    const newResultNumber = (resultNumber + 1) % results.length;
    setResultNumber(newResultNumber);
  };

  const image_urls = results[resultNumber].images.map((image) => image.url.o);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {capitalizeFirstLetter(t("scientific_name")) + ":"}{" "}
        </Text>
        <Text>
          {results[resultNumber].species.scientificNameWithoutAuthor}{" "}
        </Text>
        <Text style={styles.title}>
          {capitalizeFirstLetter(t("family")) + ":"}{" "}
        </Text>
        <Text>
          {results[resultNumber].species.family.scientificNameWithoutAuthor}{" "}
        </Text>
        {results[resultNumber].species.commonNames &&
          results[resultNumber].species.commonNames.length > 0 && (
            <>
              <Text style={styles.title}>
                {capitalizeFirstLetter(t("common_names")) + ":"}
              </Text>
              {results[resultNumber].species.commonNames.map(
                (element, index) => (
                  <Text key={index}>{element}</Text>
                )
              )}
            </>
          )}
        <Text style={styles.title}>
          {capitalizeFirstLetter(t("images")) + ":"}{" "}
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            {image_urls.map((url, index) => (
              <Image
                key={index}
                source={{ uri: url }}
                style={styles.plantPic}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{t("add_to_my_plants")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.secondary }]}
          onPress={ChangeResultNumber}
        >
          <Text style={styles.buttonText}>{t("wrong_identification")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default IdentifyPlantScreen;
