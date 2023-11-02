import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./PlantIdentifierStyles";
import { capitalizeFirstLetter } from "../../utils/device";


function IdentifyPlantScreen({ route }) {
  const { results } = route.params; 
  const { t } = useTranslation();
  const image_urls = results[0].images.map(image => image.url.o);
  return (
    <View style={ styles.container }>
      <Text style={styles.title}>{capitalizeFirstLetter(t("scientific_name")) + ":"} </Text>
      <Text>{ results[0].species.scientificNameWithoutAuthor } </Text>
      <Text style={styles.title}>{capitalizeFirstLetter(t("family")) + ":"} </Text>
      <Text>{ results[0].species.family.scientificNameWithoutAuthor } </Text>
      <Text style={styles.title}>{capitalizeFirstLetter(t("common_names")) + ":"} </Text>
      {results[0].species.commonNames.map((element, index) => (
        <Text key={index}>{element}</Text>
      ))}
      <Text style={styles.title}>{capitalizeFirstLetter(t("images")) + ":"} </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row' }}>
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
  );
}

export default IdentifyPlantScreen;
