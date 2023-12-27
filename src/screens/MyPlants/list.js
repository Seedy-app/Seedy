import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  Portal,
  Text,
  useTheme,
  IconButton,
  Menu,
  Searchbar,
  Button,
} from "react-native-paper";
import styles from "./MyPlantsStyles";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../../utils/device";
import Config from "../../config/Config";
import Colors from "../../config/Colors";
import EmptyImage from "../../assets/images/depressed-plant.gif";
import PlantCard from "../CustomComponents/PlantCard";
import CustomInput from "../CustomComponents/CustomInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from "expo-notifications";

function ListMyPlantsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [plants, setPlants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReminderFormVisible, setIsReminderFormVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCommonName, setSelectedCommonName] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [allPlants, setAllPlants] = useState([]);
  const [reminderDescription, setReminderDescription] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reminderRepeat, setReminderRepeat] = useState("none"); // 'daily', 'weekly', 'monthly', 'custom'
  const [customRepeatDays, setCustomRepeatDays] = useState(1); // Para la opción personalizada

  useEffect(() => {
    loadPlants();
  }, []);

  const openModal = (plant) => {
    setSelectedPlant(plant);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedPlant(null);
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPlants();
    setRefreshing(false);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleBellIconPress = (plant) => {
    setSelectedPlant(plant);
    setSelectedCommonName(plant.common_names[0]);
    setIsReminderFormVisible(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = allPlants.filter(
      (plant) =>
        plant.scientific_name.toLowerCase().includes(query.toLowerCase()) ||
        plant.family.toLowerCase().includes(query.toLowerCase())
    );
    setPlants(filtered.slice(0, 5));
  };

  const loadMorePlants = () => {
    if (loadingMore || plants.length >= allPlants.length) return;

    setLoadingMore(true);
    const nextPlants = allPlants
      .filter(
        (plant) =>
          plant.scientific_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          plant.family.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, plants.length + 5);
    setPlants(nextPlants);
    setLoadingMore(false);
  };

  const removePlantFromUser = async (plant_id) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        `${Config.API_URL}/plant/disassociate/${plant_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error removing plant from user");
      }

      const responseData = await response.json();
      setPlants(plants.filter((plant) => plant.id !== plant_id));
      closeModal();
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error removing plant:", error);
      Alert.alert(capitalizeFirstLetter(t("error")), t("remove_plant_error"));
    }
  };

  async function fetchUserPlants(user_id) {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        `${Config.API_URL}/plant/getUserPlants/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setAllPlants(responseData.plants);
      setPlants(responseData.plants.slice(0, 5));
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error fetching plants:", error);
    }
  }

  const loadPlants = async () => {
    const userInfo = await AsyncStorage.getItem("userInfo");
    if (userInfo) {
      const { id } = JSON.parse(userInfo);
      try {
        await fetchUserPlants(id);
      } catch (error) {
        Sentry.captureException(error);
        console.error("Error fetching plants:", error);
      }
    }
  };

  const handleConfirm = (date) => {
    setDatePickerVisibility(false);
    setSelectedDate(date);
  };

  const scheduleReminder = async () => {
    if (!(selectedDate instanceof Date) || selectedDate <= new Date()) {
      Alert.alert(capitalizeFirstLetter(t("error")), t("invalid_or_past_date"));
      return;
    }

    let schedulingOptions;
    switch (reminderRepeat) {
      case "daily":
        schedulingOptions = {
          hour: selectedDate.getHours(),
          minute: selectedDate.getMinutes(),
          repeats: true,
        };
        break;
      case "weekly":
        schedulingOptions = {
          seconds: 7 * 24 * 60 * 60,
          repeats: true,
        };
        break;
      case "monthly":
        schedulingOptions = {
          seconds: 30 * 24 * 60 * 60,
          repeats: true,
        };
        break;
      case "custom":
        schedulingOptions = {
          seconds: customRepeatDays * 24 * 60 * 60,
          repeats: true,
        };
        break;
      default:
        schedulingOptions = selectedDate.getTime();
        break;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `[${selectedPlant.scientific_name}] ${selectedCommonName}`,
          body: reminderDescription,
          data: { plantId: selectedPlant.id },
        },
        trigger: schedulingOptions,
      });
      setIsReminderFormVisible(false);
      let formattedDate =
        [
          selectedDate.getFullYear(),
          (selectedDate.getMonth() + 1).toString().padStart(2, "0"),
          selectedDate.getDate().toString().padStart(2, "0"),
        ].join("/") +
        " " +
        selectedDate.toLocaleTimeString();

      const repeatTranslation =
        reminderRepeat !== "custom"
          ? t(reminderRepeat.toLowerCase())
          : `${customRepeatDays} ${t("days")}`;

      const successMessage = t("scheduled_notification_success", {
        date: formattedDate,
        repeat: repeatTranslation,
      });
      Alert.alert(capitalizeFirstLetter(t("success")), successMessage);
    } catch (error) {
      Sentry.captureException(error);
      console.log(error);
      Alert.alert(
        capitalizeFirstLetter(t("error")),
        t("scheduling_error_retry")
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.black,
          backgroundColor: Colors.white,
        }}
      >
        <Searchbar
          style={styles.searchBar}
          iconColor={theme.colors.placeholderTextColor}
          placeholderTextColor={theme.colors.secondary}
          placeholder={t("search_plant")}
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      <View style={styles.container}>
        {plants && plants.length > 0 ? (
          <FlatList
            data={plants}
            renderItem={({ item }) => {
              return (
                <PlantCard
                  plant={item}
                  onPress={openModal}
                  handleBellIconPress={handleBellIconPress}
                />
              );
            }}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={loadMorePlants}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              loadingMore ? <ActivityIndicator size="large" /> : null
            }
          />
        ) : (
          <View style={styles.centeredView}>
            <Image source={EmptyImage} style={styles.centeredImage} />
            <Text
              style={{
                ...styles.screenCenterText,
                color: theme.colors.secondary,
              }}
            >
              {t("my_plants_empty_message")}
            </Text>
          </View>
        )}

        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={closeModal}
            contentContainerStyle={styles.modalContainerStyle}
          >
            {selectedPlant && (
              <>
                <View style={styles.optionsButtonStyle}>
                  <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    style={styles.menu}
                    anchor={
                      <IconButton
                        icon="dots-horizontal"
                        color="red"
                        size={20}
                        onPress={openMenu}
                      />
                    }
                  >
                    <Menu.Item
                      onPress={() => removePlantFromUser(selectedPlant.id)}
                      title={t("remove_from_my_plants")}
                    />
                  </Menu>
                </View>

                <IconButton
                  icon="close"
                  color="black"
                  size={20}
                  style={styles.closeButtonStyle}
                  onPress={closeModal}
                />

                <View style={styles.modalInfoContainer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.infoLabel}>
                      {capitalizeFirstLetter(t("scientific_name"))}:
                    </Text>
                    <Text> {selectedPlant.scientific_name}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.infoLabel}>
                      {capitalizeFirstLetter(t("family"))}:
                    </Text>
                    <Text> {selectedPlant.family}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.infoLabel}>
                      {capitalizeFirstLetter(t("common_names"))}:
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <Text>{selectedPlant.common_names.join(", ") + "."}</Text>
                    </ScrollView>
                  </View>
                  <Text style={styles.infoLabel}>
                    {capitalizeFirstLetter(t("images"))}:
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.imagesScrollViewStyle}
                  >
                    {selectedPlant &&
                      JSON.parse(selectedPlant.images).map((image, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleImageSelect(image)}
                        >
                          <Image
                            source={{ uri: image }}
                            style={styles.imageStyle}
                          />
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                </View>
              </>
            )}
          </Modal>
          <Modal
            visible={selectedImage !== null}
            onDismiss={() => setSelectedImage(null)}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Image
                source={{ uri: selectedImage }}
                style={{ ...styles.viewBorders, width: "90%", height: "90%" }}
                resizeMode="contain"
              />
            </View>
          </Modal>
          {/* Crear recordatorio */}
          <Modal
            visible={isReminderFormVisible}
            onDismiss={() => setIsReminderFormVisible(false)}
            animationType="slide"
          >
            {selectedPlant && (
              <View style={styles.modalContainer}>
                <Text style={{ ...styles.title, fontSize: 20 }}>
                  {t("reminder_title", {
                    scientific_name: selectedPlant.scientific_name,
                  })}
                </Text>
                <Text style={{ ...styles.label, marginTop: "3%" }}>
                  🌱 {t("reminder_description_label")}
                </Text>
                <View style={{ marginTop: "3%" }}>
                  <CustomInput
                    label={t("reminder_description")}
                    value={reminderDescription}
                    onChangeText={setReminderDescription}
                    mode="outlined"
                  />
                </View>
                <Text style={{ ...styles.label, marginTop: "3%" }}>
                  🌟 {t("choose_common_name_label")}
                </Text>
                <View style={{ ...styles.viewBorders, marginTop: "3%" }}>
                  <Picker
                    selectedValue={selectedCommonName}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedCommonName(itemValue)
                    }
                  >
                    {selectedPlant &&
                      selectedPlant.common_names.map((name, index) => {
                        return (
                          <Picker.Item
                            style={{ color: "black", fontSize: 16 }}
                            label={name}
                            value={name}
                            key={index}
                          />
                        );
                      })}
                  </Picker>
                </View>
                <Text style={{ ...styles.label, marginTop: "3%" }}>
                  📅 {t("select_datetime_label")}
                </Text>
                <View style={{ marginTop: "3%" }}>
                  <Button
                    icon="calendar"
                    mode="outlined"
                    onPress={() => setDatePickerVisibility(true)}
                  >
                    {selectedDate
                      ? selectedDate.toLocaleString()
                      : t("select_datetime")}
                  </Button>
                </View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={() => setDatePickerVisibility(false)}
                />
                <Text style={{ ...styles.label, marginTop: "3%" }}>
                  🔁 {t("select_repeat_option")}
                </Text>
                <View style={{ ...styles.viewBorders, marginTop: "3%" }}>
                  <Picker
                    selectedValue={reminderRepeat}
                    onValueChange={(itemValue, itemIndex) =>
                      setReminderRepeat(itemValue)
                    }
                  >
                    <Picker.Item
                      style={{ color: "black", fontSize: 16 }}
                      label={t("no_repeat")}
                      value="none"
                    />
                    <Picker.Item
                      style={{ color: "black", fontSize: 16 }}
                      label={t("daily")}
                      value="daily"
                    />
                    <Picker.Item
                      style={{ color: "black", fontSize: 16 }}
                      label={t("weekly")}
                      value="weekly"
                    />
                    <Picker.Item
                      style={{ color: "black", fontSize: 16 }}
                      label={t("monthly")}
                      value="monthly"
                    />
                    <Picker.Item
                      style={{ color: "black", fontSize: 16 }}
                      label={t("custom")}
                      value="custom"
                    />
                  </Picker>
                </View>

                {reminderRepeat === "custom" && (
                  <View style={{ marginTop: "3%" }}>
                    <CustomInput
                      label={t("custom_repeat_days")}
                      value={String(customRepeatDays)}
                      onChangeText={(text) => setCustomRepeatDays(Number(text))}
                      keyboardType="numeric"
                      mode="outlined"
                    />
                  </View>
                )}
                <Button
                  icon="check"
                  mode="contained"
                  onPress={scheduleReminder}
                  style={{ marginTop: 20 }}
                ></Button>
              </View>
            )}
          </Modal>
        </Portal>
      </View>
    </View>
  );
}

export default ListMyPlantsScreen;
