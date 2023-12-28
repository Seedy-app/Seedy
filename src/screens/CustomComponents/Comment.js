import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { IconButton, useTheme } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import Config from "../../config/Config";
import styles from "../../config/CommonStyles";
import Colors from "../../config/Colors";
import { reactComment } from "../../utils/api";
import * as Sentry from '@sentry/react-native';


const Comment = ({
  comment,
  index,
  user_id,
  onClickOptions,
  hide_pictures = false,
}) => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const theme = useTheme();
  const [commentReactions, setCommentReactions] = useState(
    comment.commentReactions
  );
  const [content, setContent] = useState(comment.content);

  useEffect(() => {
    setCommentReactions(comment.commentReactions);
    if (hide_pictures) {
      const modifiedContent = comment.content.replace(/<img[^>]*>/g, "🖼️");
      setContent(modifiedContent);
    }
  }, [comment.commentReactions, comment.content, hide_pictures]);

  const handleReactToComment = async (comment_id, type) => {
    try {
      react_response = await reactComment(comment_id, type);
      if (react_response) {
        let newReactions = [...commentReactions];
        const reactionIndex = newReactions.findIndex(
          (reaction) => reaction.user_id === user_id
        );
        if (reactionIndex !== -1) {
          if (newReactions[reactionIndex].reaction_type === type) {
            newReactions.splice(reactionIndex, 1);
          } else {
            newReactions[reactionIndex].reaction_type = type;
          }
        } else {
          newReactions.push({ user_id, reaction_type: type });
        }
        setCommentReactions(newReactions);
      }
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <View
      key={index}
      style={{
        ...styles.commentView,
        maxWidth: Dimensions.get("window").width,
      }}
    >
      <View style={styles.commentInfoBox}>
        <Image
          source={{ uri: Config.API_URL + comment.user.picture }}
          style={[styles.smallProfilePic]}
        />
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={{
            color: Colors[comment.user.userCommunities[0].role.name],
            fontWeight: "bold",
          }}
        >
          {comment.user.username}
        </Text>

        <View style={styles.reactionBox}>
          <View style={{ alignItems: "center" }}>
            <IconButton
              icon="thumb-up"
              size={theme.fonts.default.fontSize}
              iconColor={
                commentReactions.some(
                  (reaction) =>
                    reaction.reaction_type === "like" &&
                    reaction.user_id === user_id
                )
                  ? theme.colors.primary
                  : theme.colors.secondary
              }
              onPress={async () =>
                await handleReactToComment(comment.id, "like")
              }
            />
            <Text>
              {
                commentReactions.filter(
                  (reaction) => reaction.reaction_type === "like"
                ).length
              }
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <IconButton
              icon="thumb-down"
              size={theme.fonts.default.fontSize}
              iconColor={
                commentReactions.some(
                  (reaction) =>
                    reaction.reaction_type === "dislike" &&
                    reaction.user_id === user_id
                )
                  ? theme.colors.danger
                  : theme.colors.secondary
              }
              onPress={async () =>
                await handleReactToComment(comment.id, "dislike")
              }
            />
            <Text>
              {
                commentReactions.filter(
                  (reaction) => reaction.reaction_type === "dislike"
                ).length
              }
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, padding: "1%" }}>
        {onClickOptions && (
          <View style={{ flex: 0.05 }}>
            <IconButton
              icon="dots-vertical"
              size={20}
              onPress={() => onClickOptions(comment)}
              style={styles.commentOptionsButton}
            />
          </View>
        )}
        <View
          style={{ flex: 0.9, maxWidth: Dimensions.get("window").width * 0.65 }}
        >
          <RenderHtml
            contentWidth={width * 0.65}
            source={{ html: content }}
            tagsStyles={{
              img: {
                maxWidth: Dimensions.get("window").width * 0.65,
                maxHeight: "100%",
                height: "auto",
                resizeMode: "contain",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "black",
                marginVertical: "1%",
              },
            }}
          />
        </View>
        <View style={{ flex: 0.05, alignItems: "flex-end" }}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{ color: "grey", fontSize: theme.fonts.bodySmall.fontSize }}
          >
            {new Date(comment.createdAt).toLocaleString(t.language, {
              year: "2-digit",
              month: "2-digit",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Comment;
