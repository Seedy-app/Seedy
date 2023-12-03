import React, { useState } from "react";
import { View, Alert, Dimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import styles from "./CommunitiesStyles";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../../utils/device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../config/Config";

const CommunitySettingsScreen = () => {
  const route = useRoute();
  const community = route.params.community;
  const navigation = useNavigation();
  const { t } = useTranslation();
  const theme = useTheme();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [communityNameInput, setCommunityNameInput] = useState("");

  const handleDelete = async () => {
    if (communityNameInput === community.name) {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        `${Config.API_URL}/communities/${community.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        console.info(response);
        Alert.alert(
          capitalizeFirstLetter(t("error")),
          capitalizeFirstLetter(t("error_deleting_community"))
        );
      } else {
        Alert.alert(
          capitalizeFirstLetter(t("success")),
          capitalizeFirstLetter(t("community_deleted"))
        );
        navigation.navigate(t("communities_list"));
      }
      setIsDeleteModalVisible(false);
      // Aquí iría tu lógica para realizar la solicitud DELETE
    } else {
      Alert.alert(
        capitalizeFirstLetter(t("error")),
        capitalizeFirstLetter(t("community_name_mismatch"))
      );
    }
  };

  const showDeleteModal = () => setIsDeleteModalVisible(true);
  const hideDeleteModal = () => setIsDeleteModalVisible(false);

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        icon="trash-can"
        onPress={showDeleteModal}
        buttonColor={theme.colors.danger}
        style={styles.button}
      >
        {t("delete_community")}
      </Button>

      <Portal>
        <Modal
          visible={isDeleteModalVisible}
          onDismiss={hideDeleteModal}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("delete_community")}</Text>
            <Text style={styles.modalText}>
              {t("delete_community_instructions") +
                ' ("' +
                community.name +
                '"):'}
            </Text>
            <TextInput
              label={t("community_name")}
              value={communityNameInput}
              onChangeText={setCommunityNameInput}
              style={styles.input}
              autoCapitalize="none"
            />
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                buttonColor={theme.colors.danger}
                onPress={handleDelete}
                style={{ ...styles.button, width:"45%" }}
              >
                {capitalizeFirstLetter(t("confirm"))}
              </Button>
              <Button
                mode="contained"
                onPress={hideDeleteModal}
                style={{ ...styles.button, width:"45%" }}
              >
                {capitalizeFirstLetter(t("cancel"))}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default CommunitySettingsScreen;
