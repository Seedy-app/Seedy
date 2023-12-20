import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  FlatList,
  ImageBackground,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  Portal,
  Text,
  useTheme,
  Card,
  List,
  IconButton,
  Menu,
  Searchbar,
} from "react-native-paper";
import styles from "./MyPlantsStyles";
import { useTranslation } from "react-i18next";
import { hexToRGBA, capitalizeFirstLetter } from "../../utils/device";
import Config from "../../config/Config";
import Colors from "../../config/Colors";
import EmptyImage from "../../assets/images/depressed-plant.gif";

function ListMyPlantsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [plants, setPlants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [allPlants, setAllPlants] = useState([]);

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
      console.error("Error removing plant:", error);
      alert(t("remove_plant_error"));
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
        console.error("Error fetching plants:", error);
      }
    }
  };

  const renderPlantCard = ({ item: plant }) => {
    return (
      <Card onPress={() => openModal(plant)} style={styles.plantCard}>
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
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.black, backgroundColor: Colors.white }}>
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
        {plants.length > 0 ? (
          <FlatList
            data={plants}
            renderItem={renderPlantCard}
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
                    {JSON.parse(selectedPlant.images).map((image, index) => (
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
        </Portal>
      </View>
    </View>
  );
}

export default ListMyPlantsScreen;
