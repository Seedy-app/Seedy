// Importamos las dependencias necesarias
import React, { useState } from 'react';
import { View } from 'react-native';
import { useLayoutEffect } from 'react';
import { useRoute, useNavigation  } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import i18next from "../../services/i18next";
import { useTranslation } from "react-i18next";
import styles from "./CommunitiesStyles";
import Config from '../../config/Config';
import { TabBar } from 'react-native-tab-view';


const PostsTab = () => (
  <View></View>
);

const MembersTab = () => (
  <View></View>
);

const ChatTab = () => (
  <View></View>
);

const InfoTab = () => (
  <View></View>
);
  
const CommunityScreen = () => {
  const route = useRoute();
  const community = route.params.community;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: community.name,
    });
  }, [navigation]);
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posts', title: t("posts") },
    { key: 'members', title: t("members") },
    { key: 'chat', title: t("chat") },
    { key: 'info', title: t("info") },
  ]);

  const renderScene = SceneMap({
    posts: PostsTab,
    members: MembersTab,
    chat: ChatTab,
    info: InfoTab,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={props => (
        <TabBar 
          {...props} 
          style={styles.tab} 
          labelStyle={styles.tabLabel}
          />
        )}
    />
  );
}

export default CommunityScreen;
