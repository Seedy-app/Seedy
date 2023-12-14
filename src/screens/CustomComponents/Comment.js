import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import Config from "../../config/Config";
import styles from "../../config/CommonStyles";
import Colors from "../../config/Colors";

const Comment = ({ comment, index }) => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <View key={index} style={styles.commentView}>
      <View
        style={{
          alignItems: "center",
          width: Dimensions.get("window").width * 0.2,
          marginRight: "2%",
          borderRightColor: "grey",
          borderRightWidth: 1,
        }}
      >
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <IconButton
              icon="thumb-up"
              size={theme.fonts.default.fontSize}
              onPress={() => console.log("Pressed like")}
            />
            <Text>{0}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <IconButton
              icon="thumb-down"
              size={theme.fonts.default.fontSize}
              onPress={() => console.log("Pressed dislike")}
            />
            <Text>{0}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 , padding: "1%"}}>
        <View style={{ flex: 0.95 }}>
          <RenderHtml
            contentWidth={width}
            source={{ html: comment.content }}
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
