import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { useWindowDimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import RenderHtml from 'react-native-render-html';
import Config from "../../config/Config";
import styles from "./CommunitiesStyles";
import loadingImage from "../../assets/images/loading.gif";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ViewPostScreen = ({ route }) => {
  const [post, setPost] = useState(null);
  const { post_id } = route.params;
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: post ? post.title : t("view_post"),
    });
  }, [post, navigation]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          console.error(t("not_logged_in_error"));
        }
        const response = await fetch(
          `${Config.API_URL}/communities/posts/${post_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [post_id]);

  if (!post) {
    return (
      <View style={styles.centeredView}>
        <Image
          source={loadingImage}
          style={[styles.FormProfilePic, styles.formPicPreview]}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <Card>
        <Card.Content>
          {/* Renderizar contenido HTML */}
          <RenderHtml
            contentWidth={width}
            source={{ html: post.content }}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default ViewPostScreen;
