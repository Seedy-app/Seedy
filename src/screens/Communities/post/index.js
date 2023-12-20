import React, { useEffect, useState, useLayoutEffect } from "react";
import styles from "../CommunitiesStyles";
import { View, FlatList, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { capitalizeFirstLetter } from "../../../utils/device";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";
import PostCard from "../../CustomComponents/PostCard";
import Pagination from "../../CustomComponents/Pagination";
import { getUserCommunityRole, getCommunityPosts } from "../../../utils/api";
import { HeaderBackButton } from "@react-navigation/elements";

const ListPostsScreen = ({ route, navigation }) => {
  const { community, category, currentCategoriesPage, currentPostsPage } =
    route.params;
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: capitalizeFirstLetter(category.name),
      headerLeft: () => (
        <HeaderBackButton
          onPress={() =>
            navigation.navigate(t("community"), {
              community,
              currentCategoriesPage,
              currentPostsPage,
            })
          }
        />
      ),
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      if (userInfo && userInfo.id) {
        fetchPosts();
      }
    }, [userInfo])
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(t("community"), {
          community,
          currentCategoriesPage,
          currentPostsPage,
        });
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }, [navigation, t, currentCategoriesPage, currentPostsPage])
  );

  const fetchPosts = async (page = 1, limit = 10) => {
    try {
      let data = await getCommunityPosts(
        community.id,
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
        data={posts}
        renderItem={({ item }) => (
          <PostCard post={item} community_id={community.id} user_role={userRole} />
        )}
        keyExtractor={(item) => String(item.id)}
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
