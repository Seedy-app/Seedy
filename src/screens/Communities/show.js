// Importamos las dependencias necesarias
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useTranslation } from "react-i18next";
import styles from "./CommunitiesStyles";
import Config from "../../config/Config";
import { TabBar } from "react-native-tab-view";
import PostsTab from './show-posts';
import MembersTab from './show-members';
import ChatTab from './show-chat';
import InfoTab from './show-info';

const CommunityScreen = () => {
  const [communityMembersData, setCommunityMembersData] = useState([]);

  const route = useRoute();
  const community = route.params.community;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      await fetchCommunityMembers();
    };

    const fetchCommunityMembers = async () => {
      try {
        const response = await fetch(`${Config.API_URL}/communities/${community.id}/members`);
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        const data = await response.json();
        setCommunityMembersData(data);
      } catch (error) {
        console.error("Error fetching community members:", error);
      }
    };

    fetchData();
  }, []);

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
    info: () => <InfoTab someProp={null} />
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <TabBar {...props} style={styles.tab} labelStyle={styles.tabLabel} />
      )}
    />
  );
};

export default CommunityScreen;
