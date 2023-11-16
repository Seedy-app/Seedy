import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "react-native-paper";
import styles from "./MyPlantsStyles";
import { useTranslation } from "react-i18next";
import Config from "../../config/Config";

async function fetchUserPlants(userId, token) {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(
      `${Config.API_URL}/plant/getUserPlants/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
}

function ListMyPlantsScreen() {
  const { t } = useTranslation();
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const loadPlants = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const { id } = JSON.parse(userInfo);
        const userPlants = await fetchUserPlants(id);
        if (userPlants) {
          setPlants(userPlants);
        }
      }
    };

    loadPlants();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      {plants.map((plant, index) => (
        <Card key={index} style={styles.card}>
          <Card.Title title={plant.scientific_name} subtitle={plant.family} />
          <Card.Content>{<Text>Hola</Text>}</Card.Content>
          <Card.Cover source={{ uri: JSON.parse(plant.images).length > 0 ? JSON.parse(plant.images)[Math.floor(Math.random() * JSON.parse(plant.images).length)] : null }} />
        </Card>
      ))}
    </ScrollView>
  );
}

export default ListMyPlantsScreen;
