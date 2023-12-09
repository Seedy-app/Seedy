// Importamos las dependencias necesarias
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { View, Image } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  useTheme,
} from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./CommunitiesStyles";
import Config from "../../config/Config";
import PostsTab from "./postsTab";
import MembersTab from "./membersTab";
import ChatTab from "./chatTab";
import InfoTab from "./infoTab";
import loadingImage from "../../assets/images/loading.gif";
import { giveUserCommunityRole, getCommunityCategories, getUserCommunityRole } from "../../utils/api";
import { capitalizeFirstLetter } from "../../utils/device";

const CommunityScreen = () => {
  const [userInfo, setUserInfo] = useState({});
  const [communityMembersData, setCommunityMembersData] = useState([]);
  const [communityCategoriesData, setCommunityCategoriesData] = useState([]);
  const [communityPostsData, setCommunityPostsData] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [currentPostsPage, setCurrentPostsPage] = useState(1);
  const [totalPostsPages, setTotalPostsPages] = useState(0);
  const [currentCategoriesPage, setCurrentCategoriesPage] = useState(1);
  const [totalCategoriesPages, setTotalCategoriesPages] = useState(0);

  const theme = useTheme();
  const route = useRoute();
  const community = route.params.community;
  const navigation = useNavigation();



  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        setUserInfo(userInfo);
        const roleData = await getUserCommunityRole(userInfo.id, community.id);
        if (roleData) {
          setUserRole(roleData);
        }
      }
    };

    fetchUserInfo();
  }, [community.id]);

  // Para obtener los miembros de la comunidad
  useFocusEffect(
    React.useCallback(() => {
      if (userInfo && userInfo.id) {
        // Solo ejecutar si userInfo y userInfo.id existen
        fetchCommunityMembers();
        fetchCommunityPosts();
      }
      fetchCommunityCategories();
    }, [userInfo, refresh])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: capitalizeFirstLetter(community.name),
      headerRight: () => (userRole && ['community_founder', 'community_moderator'].includes(userRole.name)?
        <IconButton
          icon="cog"
          iconColor={theme.colors.primary}
          size={24}
          onPress={() =>
            navigation.navigate(t("community_settings"), { community })
          }
        />:<></>
      ),
    });
  }, [navigation, userRole]);
  

  const changePostsPage = (newPage) => {
    setCurrentPostsPage(newPage);
    fetchCommunityPosts(newPage);
  };

  const changeCategoriesPage = (newPage) => {
    setCurrentCategoriesPage(newPage);
    fetchCommunityCategories(newPage);
  };

  const fetchCommunityCategories = async (page = 1) => {
    try {
      let data = await getCommunityCategories(community.id, page);
      if (data){
        setCommunityCategoriesData(data.categories);
        setTotalCategoriesPages(data.totalPages);
        setIsLoading(false); // Finalizar la carga
      }else{
        setCommunityCategoriesData([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching community categories:", error);
    }
  };

  const fetchCommunityPosts = async (page = 1, limit = 5) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.error(t("not_logged_in_error"));
        return { error: t("not_logged_in_error") };
      }
      const response = await fetch(`${Config.API_URL}/communities/${community.id}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          limit,
          page,
        }),
      });
      if (response.status === 404) {
        setCommunityPostsData([]);
        setIsLoading(false);
        return;
      }
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const data = await response.json();
      setCommunityPostsData(data.posts);
      setTotalPostsPages(data.totalPages);
      setIsLoading(false); // Finalizar la carga
    } catch (error) {
      console.error("Error fetching community posts:", error);
    }
  };

  const fetchCommunityMembers = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        console.error(t("not_logged_in_error"));
      }
      const response = await fetch(
        `${Config.API_URL}/communities/${community.id}/members`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
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
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "posts", title: t("posts") },
    { key: "members", title: t("members") },
    { key: "chat", title: t("chat") },
    { key: "info", title: t("info") },
  ]);
  const renderScene = SceneMap({
    posts: () => (
      <PostsTab
        userRole={userRole}
        communityCategories={communityCategoriesData}
        communityPosts={communityPostsData}
        communityId={community.id}
        currentPostsPage={currentPostsPage}
        totalPostsPages={totalPostsPages}
        onPostsPageChange={changePostsPage}
        fetchCommunityPosts={fetchCommunityPosts}
        currentCategoriesPage={currentCategoriesPage}
        totalCategoriesPages={totalCategoriesPages}
        onCategoriesPageChange={changeCategoriesPage}
        fetchCommunityCategories={fetchCommunityCategories}
      />
    ),
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
              indicatorStyle={{ backgroundColor: theme.colors.primary }}
            />
          )}
        />
      ) : (
        <View style={{ ...styles.container }}>
          <Card style={styles.communityPreview}>
            <Card.Content>
              <Title style={styles.title}>
                {capitalizeFirstLetter(community.name)}
              </Title>
              <Paragraph>{community.description}</Paragraph>
            </Card.Content>
            <Card.Cover
              source={{ uri: Config.API_URL + community.picture }}
              style={styles.communityPreviewCover}
            />
            <Card.Actions>
              <Button onPress={join_community}>{t("join_community")}</Button>
            </Card.Actions>
          </Card>
        </View>
      )}
    </>
  );
};

export default CommunityScreen;
