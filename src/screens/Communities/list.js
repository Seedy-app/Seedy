// Importamos las dependencias necesarias
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./CommunitiesStyles";
import Config from "../../config/Config";
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
      const response = await fetch(Config.API_URL + "/communities");
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

  // Usamos useEffect para obtener los datos cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  // Función que se ejecuta cuando el usuario intenta refrescar la lista
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Componente para representar cada comunidad en la lista
  const CommunityCard = ({ community }) => (
    <TouchableOpacity
      style={{...styles.listCard, padding: 15}}
      onPress={() =>
        navigation.navigate(t("community"), { community: community })
      }
    >
      <Image
        source={{ uri: Config.API_URL + community.picture }}
        style={styles.communityListPic}
      />
      <View style={{...styles.communityShortInfo, paddingLeft: 20}}>
        <Text style={styles.title}>
          {capitalizeFirstLetter(community.name)}
        </Text>
        <Text
          style={styles.cardDescription}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {capitalizeFirstLetter(community.description)}
        </Text>

        <Text style={styles.userCount}>{`${
          community.userCount
        } ${capitalizeFirstLetter(t("members"))}`}</Text>
      </View>
    </TouchableOpacity>
  );

  // Renderizamos el componente principal
  return (
    <View style={styles.communitiesContainer}>
      {/* FlatList para mostrar las comunidades */}
      <FlatList
        data={communitiesData}
        renderItem={({ item }) => <CommunityCard community={item} />}
        keyExtractor={(item) => item.id.toString()}
        // Control de refresco para la lista
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

export default CommunitiesScreen;
