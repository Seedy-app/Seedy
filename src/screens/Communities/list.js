// Importamos las dependencias necesarias
import React, { useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, FlatList, RefreshControl } from "react-native";
import { Card, Paragraph, Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import styles from "./CommunitiesStyles";
import Config from "../../config/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { capitalizeFirstLetter } from "../../utils/device";

function CommunitiesScreen() {
  // Usamos el hook de navegación
  const navigation = useNavigation();

  // Usamos el hook de traducción
  const { t } = useTranslation();

  // Estado para almacenar los datos de las comunidades
  const [communitiesData, setCommunitiesData] = useState([]);

  // Estado para controlar el refresco de la lista
  const [refreshing, setRefreshing] = useState(false);

  // Función para obtener los datos de las comunidades desde la API
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        console.error(t("not_logged_in_error"));
      }
      const response = await fetch(Config.API_URL + "/communities", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const data = await response.json();
      setCommunitiesData(data);
    } catch (error) {
      console.error("Error fetching communities:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  // Función que se ejecuta cuando el usuario intenta refrescar la lista
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Componente para representar cada comunidad en la lista
  const CommunityCard = ({ community }) => (
    <Card
      onPress={() => navigation.navigate(t("community"), { community })}
      style={styles.listCard}
    >
      <Card.Title
        title={capitalizeFirstLetter(community.name)}
        subtitle={`${community.userCount} ${capitalizeFirstLetter(
          t("members")
        )}`}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={{ uri: Config.API_URL + community.picture }}
            size={50}
          />
        )}
      />
      <Card.Content>
        <Paragraph numberOfLines={1} ellipsizeMode="tail">
          {capitalizeFirstLetter(community.description)}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  // Renderizamos el componente principal
  return (
    <View style={styles.communitiesContainer}>
      <FlatList
        data={communitiesData}
        renderItem={({ item }) => <CommunityCard community={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

export default CommunitiesScreen;
