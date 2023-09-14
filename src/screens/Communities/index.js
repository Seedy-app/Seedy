// Importamos las dependencias necesarias
import React, { useState, useEffect } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";
import styles from "./CommunitiesStyles";
import Config from '../../config/Config';

function CommunitiesScreen() {
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
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const data = await response.json();
      setCommunitiesData(data);
    } catch (error) {
      console.error('Error fetching communities:', error);
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
    <TouchableOpacity style={styles.communityCard}>
        <Image 
          source={community.picture ? { uri: community.picture } : require('../../assets/images/favicon.png')} 
          style={styles.communityPic}  // Asegúrate de ajustar estas dimensiones según lo que necesites
        />
      <View style={styles.communityShortInfo}>
        <Text style={styles.communityName}>{community.name}</Text>
        <Text style={styles.communityDescription}>{community.description}</Text>
      </View>
    </TouchableOpacity>
  );

  // Renderizamos el componente principal
  return (
    <View style={styles.container}>
      {/* FlatList para mostrar las comunidades */}
      <FlatList 
        data={communitiesData}
        renderItem={({ item }) => <CommunityCard community={item} />}
        keyExtractor={item => item.id.toString()}
        // Control de refresco para la lista
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}

export default CommunitiesScreen;
