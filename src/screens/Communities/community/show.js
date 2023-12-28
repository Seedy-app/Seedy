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
import * as Sentry from "@sentry/react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../CommunitiesStyles";
import Config from "../../../config/Config";
import PostsTab from "./postsTab";
import MembersTab from "./membersTab";
import ChatTab from "./chatTab";
import InfoTab from "./infoTab";
import loadingImage from "../../../assets/images/loading.gif";
import {
  giveUserCommunityRole,
  getCommunityCategories,
  getUserCommunityRole,
  getCommunityPosts,
} from "../../../utils/api";
import { capitalizeFirstLetter, isModerator } from "../../../utils/device";

const CommunityScreen = () => {
  const [userInfo, setUserInfo] = useState({});
  const [communityMembersData, setCommunityMembersData] = useState([]);
  const [communityCategoriesData, setCommunityCategoriesData] = useState([]);
  const [communityPostsData, setCommunityPostsData] = useState([]);
  const [isMember, setIsMember] = useState(null);
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
  }, [community.id, refresh]);

  useEffect(() => {
    if (route.params?.currentCategoriesPage) {
      setCurrentCategoriesPage(route.params.currentCategoriesPage);
    }
  }, [route.params?.currentCategoriesPage]);

  useEffect(() => {
    if (route.params?.currentPostsPage) {
      setCurrentPostsPage(route.params.currentPostsPage);
    }
  }, [route.params?.currentPostsPage]);

  useFocusEffect(
    React.useCallback(() => {
      if (userInfo && userInfo.id) {
        fetchCommunityMembers();
      }
    }, [userInfo, refresh])
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchCommunityCategories(currentCategoriesPage);
    }, [currentCategoriesPage, refresh])
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchCommunityPosts(currentPostsPage);
    }, [, refresh])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: capitalizeFirstLetter(community.name),
      headerRight: () =>
        userRole && isModerator(userRole) ? (
          <IconButton
            icon="cog"
            iconColor={theme.colors.primary}
            size={24}
            onPress={() =>
              navigation.navigate(t("community_settings"), {
                community,
                userRole,
              })
            }
          />
        ) : (
          <></>
        ),
    });
  }, [navigation, userRole, community.name]);

  const changePostsPage = (newPage) => {
    setCurrentPostsPage(newPage);
    fetchCommunityPosts(newPage);
  };

  const changeCategoriesPage = (newPage) => {
    setCurrentCategoriesPage(newPage);
    fetchCommunityCategories(newPage);
  };

  const fetchCommunityCategories = async (
    page = 1,
    limit = 5,
    changeStates = true
  ) => {
    try {
      let data = await getCommunityCategories(community.id, page, limit);
      if (changeStates) {
        if (data) {
          setCommunityCategoriesData(data.categories);
          setTotalCategoriesPages(data.totalPages);
        } else {
          setCommunityCategoriesData([]);
        }
        setIsLoading(false);
      }
      return data;
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error fetching community categories:", error);
    }
  };

  const fetchCommunityPosts = async (page = 1, limit = 5) => {
    try {
      let data = await getCommunityPosts(community.id, null, page, limit);
      if (!data) {
        setCommunityPostsData([]);
        setIsLoading(false);
        return;
      }
      setCommunityPostsData(data.posts);
      setTotalPostsPages(data.totalPages);
      setIsLoading(false);
    } catch (error) {
      Sentry.captureException(error);
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
        const userIsMember = data.data.some(
          (member) => member.id === userInfo.id
        );
        setIsMember(userIsMember);
        setIsLoading(false);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error("Error fetching community members:", error);
    }
  };
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "posts", title: t("posts") },
    { key: "chat", title: t("chat") },
    { key: "members", title: t("members") },
    { key: "info", title: t("info") },
  ]);
  const renderScene = SceneMap({
    posts: () => (
      <PostsTab
        user_id={userInfo.id}
        userRole={userRole}
        communityCategories={communityCategoriesData}
        communityPosts={communityPostsData}
        community={community}
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
    chat: () => (
      <ChatTab community={community} userInfo={userInfo} userRole={userRole} />
    ),
    members: () => (
      <MembersTab
        communityMembers={communityMembersData.data}
        community_id={community.id}
        userRole={userRole}
        userInfo={userInfo}
      />
    ),
    info: () => <InfoTab community={community} />,
  });

  const join_community = async () => {
    await giveUserCommunityRole(userInfo.id, community.id, "community_member");
    setRefresh(!refresh);
  };

  return (
    <>
      {isLoading || isMember === null ? (
        <View style={styles.fullLoading}>
          <Image
            source={loadingImage}
            style={[styles.FormProfilePic, styles.formPicPreview]}
          />
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
