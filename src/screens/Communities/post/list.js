import React, { useEffect, useState, useLayoutEffect } from "react";
import styles from "../CommunitiesStyles";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { capitalizeFirstLetter } from "../../../utils/device";
import { useTranslation } from "react-i18next";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import { getUserCommunityRole, getCommunityPosts } from "../../../utils/api";

const ListPostsScreen = ({ route, navigation }) => {
  const { community_id, category } = route.params;
  const [posts, setPosts] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        setUserInfo(userInfo);
        const roleData = await getUserCommunityRole(userInfo.id, community_id);
        if (roleData) {
          setUserRole(roleData);
        }
      }
    };

    fetchUserInfo();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: capitalizeFirstLetter(category.name),
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      if (userInfo && userInfo.id) {
        fetchPosts();
      }
    }, [userInfo, refresh])
  );

  const fetchPosts = async (page = 1, limit = 10) => {
    try {
      let data = await getCommunityPosts(
        community_id,
        category.id,
        page,
        limit
      );
      if (!data) {
        setPosts([]);
        setIsLoading(false);
        return;
      }
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching community posts:", error);
    }
  };

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    fetchPosts(newPage);
  };
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        }
      />
    </View>
  );
};

export default ListPostsScreen;
