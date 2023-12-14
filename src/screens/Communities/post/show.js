import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import RenderHtml from "react-native-render-html";
import Config from "../../../config/Config";
import styles from "../CommunitiesStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { actions } from "react-native-pell-rich-editor";
import Editor from "../../CustomComponents/Editor";
import { createComment } from "../../../utils/api";
import Comment from "../../CustomComponents/Comment";

const ViewPostScreen = ({ route }) => {
  const { post_id, community_id } = route.params;
  const [post, setPost] = useState(null);
  const [userId, setUserId] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState([]);
  const richText = useRef();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

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
    fetchComments();
  }, [post_id]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        const parsedInfo = JSON.parse(storedUserInfo);
        setUserId(parsedInfo.id);
      }
    };
    fetchUserInfo();
  }, []);

  const fetchComments = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (!token) {
      console.error(t("not_logged_in_error"));
    }
    const response = await fetch(
      `${Config.API_URL}/communities/${community_id}/posts/${post_id}/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setComments(data.rows);
    setCommentsCount(data.count);
  };

  const handleCommentSubmit = async () => {
    let content = await richText.current?.getContentHtml();
    const comment_response = await createComment(content, post_id);
    if (!comment_response) {
      Alert.alert(
        capitalizeFirstLetter(t("error")),
        capitalizeFirstLetter(t("error_posting_comment"))
      );
    } else {
      richText.current?.setContentHTML("");
      fetchComments();
    }
  };

  return (
    <ScrollView>
      {/* Publicación */}
      <Card>
        <Card.Content>
          {post && (
            <RenderHtml contentWidth={width} source={{ html: post.content }} />
          )}
        </Card.Content>
      </Card>
      {/* Comentarios */}
      <View
        style={{
          paddingTop: "1%",
          borderTopWidth: 1,
          borderColor: "black",
          borderBottomWidth: 1,
        }}
      >
        {comments.map((comment, index) => (
          <Comment comment={comment} index={index}/>        ))}
        <View style={{ paddingTop: "1%" }}>
          <Editor
            toolbarActions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertImage,
              actions.insertLink,
              // "insertPlant",
            ]}
            user_id={userId}
            type="comment"
            ref={richText}
          />
          <Button
            mode="contained"
            style={{
              ...styles.button,
              marginBottom: Dimensions.get("window").scale * 3,
            }}
            onPress={handleCommentSubmit}
          >
            <Text style={styles.buttonText}>{t("send_comment")}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewPostScreen;
