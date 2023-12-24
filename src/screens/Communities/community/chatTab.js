import React, { useEffect, useState, useRef } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-paper";
import io from "socket.io-client";
import styles from "../CommunitiesStyles";
import Config from "../../../config/Config";
import ChatMessage from "../../CustomComponents/ChatMessage";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../../../utils/device";
import CustomInput from "../../CustomComponents/CustomInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatTab = ({ community, userInfo, userRole }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);
  const { t } = useTranslation();
  const flatListRef = useRef();
  useEffect(() => {
    const fetchChatHistory = async () => {
      const token = await AsyncStorage.getItem("userToken");
      socketRef.current = io(Config.API_URL, {
        query: { token },
      });

      socketRef.current.on("receive_message", (message) => {
        if (message.community_id === community.id) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });

      fetch(`${Config.API_URL}/chat/history/${community.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages(data.filter((msg) => msg.community_id === community.id));
        })
        .catch((error) =>
          console.error("Error al obtener el historial de chat:", error)
        );
    };

    fetchChatHistory();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [community]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        text: newMessage,
        community_id: community.id,
        user: {
          ...userInfo,
          userCommunities: [{ role: { name: userRole.name } }],
        },
      };
      if (socketRef.current) {
        socketRef.current.emit("send_message", messageData);
      }
      setNewMessage("");
    }
  };

  return (
    <KeyboardAvoidingView style={{ ...styles.container }}>
      <FlatList
        keyboardShouldPersistTaps={"handled"}
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <ChatMessage item={item} t={t} user_id={userInfo.id} />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ flex: 1 }}
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <CustomInput
        value={newMessage}
        onChangeText={setNewMessage}
        label={t("write_a_message")}
      />
      <Button mode="contained" style={styles.button} onPress={sendMessage}>
        {capitalizeFirstLetter(t("send"))}
      </Button>
    </KeyboardAvoidingView>
  );
};

export default ChatTab;
