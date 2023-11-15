import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
  Icon,
} from "react-native-paper";
import styles from "./CommunitiesStyles";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../../utils/device";

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
      // Realiza la solicitud de eliminación
      setIsDeleteModalVisible(false);
      // Aquí iría tu lógica para realizar la solicitud DELETE
    } else {
      Alert.alert(t("error"), t("community_name_mismatch"));
    }
  };

  const showDeleteModal = () => setIsDeleteModalVisible(true);
  const hideDeleteModal = () => setIsDeleteModalVisible(false);

  return (
    <View>
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
            <Icon
              name="alert-circle-outline"
              size={40}
              color={theme.colors.danger}
            />
            <Text style={styles.modalTitle}>{t("delete_community")}</Text>
            <Text style={styles.modalText}>{t("delete_community_instructions")+" (\""+community.name+"\"):"}</Text>
            <TextInput
              label={t("community_name")}
              value={communityNameInput}
              onChangeText={setCommunityNameInput}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Button mode="contained" buttonColor={theme.colors.danger} onPress={handleDelete} style={styles.button}>
                {capitalizeFirstLetter(t("confirm"))}
              </Button>
              <Button mode="contained" onPress={hideDeleteModal} style={styles.button}>
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
