// Importamos las dependencias necesarias
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./CommunitiesStyles";
import Config from "../../config/Config";
import { TabBar } from "react-native-tab-view";
import PostsTab from "./show-posts";
import MembersTab from "./show-members";
import ChatTab from "./show-chat";
import InfoTab from "./show-info";
import loadingImage from "../../assets/images/loading.gif";
import {giveUserCommunityRole} from "../../utils/api"

const CommunityScreen = () => {
  const [userInfo, setUserInfo] = useState({});
  const [communityMembersData, setCommunityMembersData] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const route = useRoute();
  const community = route.params.community;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    };
    fetchUserInfo();
  }, []); // Sin dependencias, se ejecuta solo una vez al montar el componente

  // Para obtener los miembros de la comunidad
  useEffect(() => {
    const fetchCommunityMembers = async () => {
      try {
        const response = await fetch(
          `${Config.API_URL}/communities/${community.id}/members`
        );
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        const data = await response.json();
        setCommunityMembersData(data);
        if (userInfo && userInfo.id) {
          // Asegurarse de que userInfo y userInfo.id existen
          const userIsMember = data.data.some(
            (member) => member.id === userInfo.id
          );
          setIsMember(userIsMember);
        }
        setIsLoading(false); // Finalizar la carga
      } catch (error) {
        console.error("Error fetching community members:", error);
      }
    };

    if (userInfo && userInfo.id) {
      // Solo ejecutar si userInfo y userInfo.id existen
      fetchCommunityMembers();
    }
  }, [userInfo, refresh]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: community.name,
    });
  }, [navigation]);

  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "posts", title: t("posts") },
    { key: "members", title: t("members") },
    { key: "chat", title: t("chat") },
    { key: "info", title: t("info") },
  ]);

  const renderScene = SceneMap({
    posts: () => <PostsTab someProp={null} />,
    members: () => <MembersTab communityMembers={communityMembersData.data} />,
    chat: () => <ChatTab someProp={null} />,
    info: () => <InfoTab someProp={null} />,
  });

  const join_community = async () => {
    await giveUserCommunityRole(userInfo.id, community.id, "community_member");
    setRefresh(!refresh);
  };
  
  return (
    <>
      {isLoading ? (
        <View style={styles.fullLoading}>
          <Image source={loadingImage} />
        </View>
      ) : isMember ? (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tab}
              labelStyle={styles.tabLabel}
            />
          )}
        />
      ) : (
        <View style={styles.container}>
          <View style={{...styles.row, margin:7}}>
            <View style={{...styles.column, alignItems: 'center', justifyContent: 'center'}}>          
              <Image
                source={{ uri: Config.API_URL + community.picture }}
                style={styles.communityShowPic}
              />
            </View>
            <View style={{...styles.column, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.title}>{communityMembersData['data'].length+' '+t("members")}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>{t("description") + ": "}</Text>
          </View>
          <View>
          <Text >{community.description}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={join_community}>
            <Text style={styles.buttonText}>{t("join_community")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CommunityScreen;
