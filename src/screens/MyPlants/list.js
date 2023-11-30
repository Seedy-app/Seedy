import React, { useState } from "react";
import {
  ScrollView,
  View,
  FlatList,
  ImageBackground,
  RefreshControl,
  Image,
  TouchableOpacity,
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
} from "react-native-paper";
import { useFocusEffect } from '@react-navigation/native';
import styles from "./MyPlantsStyles";
import { useTranslation } from "react-i18next";
import { hexToRGBA, capitalizeFirstLetter } from "../../utils/device";
import Config from "../../config/Config";
import EmptyImage from "../../assets/images/depressed-plant.gif";

function ListMyPlantsScreen() {
  const itemsPerPage = 5;
  const theme = useTheme();
  const { t } = useTranslation();
  const [plants, setPlants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const loadUserPlants = async () => {
      };
      
      loadUserPlants();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      loadPlants();
    }, [page]) 
  );

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

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const removePlantFromUser = async (plantId) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        `${Config.API_URL}/plant/disassociate/${plantId}`,
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
      setPlants(plants.filter((plant) => plant.id !== plantId));
      closeModal();
    } catch (error) {
      console.error("Error removing plant:", error);
      alert(t("remove_plant_error"));
    }
  };

  async function fetchUserPlants(userId, page, itemsPerPage) {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        `${Config.API_URL}/plant/getUserPlants/${userId}?page=${page}&limit=${itemsPerPage}`,
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
      setPlants((prevPlants) =>
        page === 1
          ? responseData.plants
          : [...prevPlants, ...responseData.plants]
      );
      setHasMorePages(responseData.hasMore);
      return responseData.plants;
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  }

  const loadPlants = async () => {
    const userInfo = await AsyncStorage.getItem("userInfo");
    if (userInfo) {
      const { id } = JSON.parse(userInfo);
      try {
        const userPlants = await fetchUserPlants(id, page, itemsPerPage);
        if (userPlants) {
          setPlants(userPlants);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    }
  };

  const renderPlantCard = ({ item: plant, index }) => (
    <Card
      onPress={() => openModal(plant)}
      key={index}
      style={[
        styles.plantCard,
        { borderColor: hexToRGBA(theme.colors.primary, 0.5) },
      ]}
    >
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
            {plant.common_names.map((commonNames, commonNamesIndex) => (
              <List.Item
                key={commonNamesIndex}
                title={commonNames}
                titleStyle={styles.plantCardContent}
                left={() => <List.Icon icon="sprout" color="white" />}
              />
            ))}
          </Card.Content>
        </View>
      </ImageBackground>
    </Card>
  );

  const PaginationFooter = () => (
    <View style={styles.paginationContainer}>
      <IconButton
        icon="arrow-left-bold-outline"
        onPress={handlePrevPage}
        size={30}
        iconColor={theme.colors.primary}
        disabled={page === 1}
      />
      <IconButton
        icon="arrow-right-bold-outline"
        onPress={handleNextPage}
        size={30}
        iconColor={theme.colors.primary}
        disabled={!hasMorePages}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {plants.length > 0 ? (
        <FlatList
          data={plants}
          renderItem={renderPlantCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
            />
          }
          ListFooterComponent={hasMorePages ? PaginationFooter : null}
        />
      ) : (
        <View style={styles.centeredView}>
          <Image source={EmptyImage} style={styles.centeredImage} />
          <Text style={{...styles.noPlantsText, color: theme.colors.secondary}}>{t("my_plants_empty_message")}</Text>
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
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
              style={{ width: "90%", height: "90%" }}
              resizeMode="contain"
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

export default ListMyPlantsScreen;
