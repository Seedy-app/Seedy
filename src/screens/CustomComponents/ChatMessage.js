import React from "react";
import Colors from "../../config/Colors";
import Config from "../../config/Config";
import { View, Text, Image } from "react-native";
import { useTheme } from "react-native-paper";
import styles from "../../config/CommonStyles";

const ChatMessage = ({ item, t, user_id }) => {
  const theme = useTheme();
  const messageDate = new Date(item.createdAt);
  const currentDate = new Date();

  const isToday = messageDate.toDateString() === currentDate.toDateString();

  const dateTimeFormat = isToday
    ? {
        hour: "2-digit",
        minute: "2-digit",
      }
    : {
        day: "2-digit",
        month: "short",
      };

  return (
    <View
      style={{
        margin: "1%",
        padding: "1%",
        ...styles.viewBorders,
        backgroundColor:
          item.user.id == user_id
            ? theme.colors.userChatBubbleBackground
            : theme.colors.chatBubbleBackground,
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems:"center" }}>
        <Image
          style={styles.microProfilePic}
          source={{ uri: `${Config.API_URL}${item.user.picture}` }}
        />
        <Text
          style={{
            color: Colors[item.user.userCommunities[0].role.name],
            fontWeight: "bold",
          }}
        >
          {item.user.username}:{" "}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View>
          <Text
            style={{
              color:
                item.user.id == user_id
                  ? theme.colors.userChatBubbleText
                  : theme.colors.chatBubbleText,
            }}
          >
            {item.text}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color:
                item.user.id == user_id
                  ? theme.colors.userChatBubbleTime
                  : theme.colors.chatBubbleTime,
            }}
          >
            {messageDate.toLocaleString(t.language, dateTimeFormat)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatMessage;
