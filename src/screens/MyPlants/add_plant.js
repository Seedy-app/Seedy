import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import {
  Dialog,
  Paragraph,
  Searchbar,
  Button,
  Provider,
  Card,
  useTheme,
} from "react-native-paper";
import { getPlants, associatePlantToUser } from "../../utils/api";
import { capitalizeFirstLetter } from "../../utils/device";
import { useTranslation } from "react-i18next";
import styles from "./MyPlantsStyles";
import { useNavigation } from "@react-navigation/native";

const AddPlantScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [tempSelectedPlant, setTempSelectedPlant] = useState(null);

  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantsData = await getPlants();
        setOptions(plantsData);
      } catch (error) {
        console.error("Error al obtener las plantas:", error);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = options.filter(
        (option) =>
          (option.scientific_name &&
            option.scientific_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (option.family &&
            option.family.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (option.common_names &&
            option.common_names.some((name) =>
              name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  }, [searchQuery, options]);

  const selectOption = (option) => {
    setTempSelectedPlant(option);
    setIsDialogVisible(true);
  };

  const handleConfirmAdd = async () => {
    console.log(tempSelectedPlant.id);
    associated_code = await associatePlantToUser(tempSelectedPlant.id);
    setTempSelectedPlant(null);
    setIsDialogVisible(false);
    setSearchQuery("");
    setFilteredOptions([]);
    switch (associated_code) {
      case 1:
        navigation.navigate(t("my_plants"));
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
        navigation.navigate(t("my_plants"));
        break;
    }
  };

  const handleCancel = () => {
    setTempSelectedPlant(null);
    setIsDialogVisible(false);
  };

  return (
    <Provider>
      <View style={styles.container}>
          <Searchbar
            style={styles.searchBar}
            placeholder={t("search_plant")}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        {
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectOption(item)}>
                <Card>
                  <Card.Content>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Card.Cover
                        source={{ uri: JSON.parse(item.images)[0] }}
                        style={styles.listImage}
                      />
                      <View>
                        <Text style={styles.listTitle}>
                          {item.scientific_name}
                        </Text>
                        <Text style={styles.listSubtitle}>
                          {item.common_names.join(", ")}
                        </Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <Paragraph
                style={{
                  ...styles.disclaimer,
                  backgroundColor: theme.colors.primary,
                }}
              >
                {t("search_plant_disclaimer")}
              </Paragraph>
            )}
          />
        }
      </View>
      <Dialog
        visible={isDialogVisible}
        onDismiss={handleCancel}
        style={{ ...styles.dialog, borderColor: theme.colors.primary }}
      >
        <Dialog.Title>{t("confirm_selection")}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.dialogImageContainer}>
            <Image
              source={{
                uri: JSON.parse(tempSelectedPlant?.images || "[]")[0],
              }}
              style={styles.dialogImage}
              resizeMode="cover"
            />
          </View>
          <Paragraph>
            {t("confirm_add_plant_selection_text")}
            {tempSelectedPlant?.scientific_name}?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "flex-end" }}>
          <Button textColor={theme.colors.primary} onPress={handleCancel}>
            {capitalizeFirstLetter(t("cancel"))}
          </Button>
          <Button textColor={theme.colors.primary} onPress={handleConfirmAdd}>
            {capitalizeFirstLetter(t("accept"))}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Provider>
  );
};

export default AddPlantScreen;
