import React, { useState } from "react";
import { View, FlatList, Image, Text, Alert } from "react-native";
import {
  Title,
  Portal,
  Modal,
  IconButton,
  Button,
  useTheme,
  Menu,
} from "react-native-paper";
import styles from "../CommunitiesStyles";
import MemberCard from "../../CustomComponents/MemberCard";
import {
  capitalizeFirstLetter,
  isFounder,
  isModerator,
  isAdmin,
} from "../../../utils/device";
import Config from "../../../config/Config";
import Colors from "../../../config/Colors";
import { useTranslation } from "react-i18next";
import {
  deleteUserFromCommunity,
  giveUserCommunityRole,
} from "../../../utils/api";

const MembersTab = ({ communityMembers, community_id, userRole, userInfo }) => {
  const [members, setMembers] = useState(communityMembers);
  const [focusedMember, setFocusedMember] = useState(null);
  const [memberModalVisible, setMemberModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [roleMenuVisible, setRoleMenuVisible] = useState(false);
  const [confirmChangeRoleVisible, setConfirmChangeRoleVisible] =
    useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const theme = useTheme();
  const { t } = useTranslation();
  const handleChangeRoleRequest = (newRole) => {
    setSelectedRole(newRole);
    setRoleMenuVisible(false);
    setConfirmChangeRoleVisible(true);
  };

  const handleChangeRole = async () => {
    setConfirmChangeRoleVisible(false);
    await giveUserCommunityRole(focusedMember.id, community_id, selectedRole);
    const updatedMembers = members.map((member) => {
      if (member.id === focusedMember.id) {
        return {
          ...member,
          role: selectedRole,
          role_display_name: t(selectedRole),
        };
      }
      return member;
    });
    setMembers(updatedMembers);
    setMemberModalVisible(false);
  };

  const handleOnLongPressMemberCard = (member) => {
    setFocusedMember(member);
    setMemberModalVisible(true);
  };

  const handleExpelMember = () => {
    setConfirmModalVisible(true);
  };

  const confirmExpelMember = async () => {
    let response = await deleteUserFromCommunity(
      community_id,
      focusedMember.id
    );
    if (response) {
      const updatedMembers = members.filter(
        (member) => member.id !== focusedMember.id
      );
      setMembers(updatedMembers);
      setConfirmModalVisible(false);
      setMemberModalVisible(false);
      setFocusedMember(null);
      Alert.alert(
        capitalizeFirstLetter(t("success")),
        capitalizeFirstLetter(t("user_expel_success"))
      );
    } else {
      setConfirmModalVisible(false);
      Alert.alert(
        capitalizeFirstLetter(t("error")),
        capitalizeFirstLetter(t("user_expel_error"))
      );
    }
  };

  const handleReportComment = async () => {
    Alert.alert(
      capitalizeFirstLetter(t("report_alert_title")),
      capitalizeFirstLetter(t("report_alert_message"))
    );
    setMemberModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <MemberCard
            member={item}
            onLongPressAction={handleOnLongPressMemberCard}
          />
        )}
        keyExtractor={(item) => String(item.id)}
      />
      <Portal>
        {/* Modal de opciones del miembro */}
        <Modal
          visible={memberModalVisible}
          onDismiss={() => setMemberModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <IconButton
            icon="close"
            size={20}
            onPress={() => setMemberModalVisible(false)}
            style={styles.modalCloseButton}
          />
          <View style={{ ...styles.modalContent, alignItems: "center" }}>
            <View style={{ marginBottom: "5%" }}>
              <View>
                {focusedMember && (
                  <Image
                    source={{ uri: Config.API_URL + focusedMember.picture }}
                    style={{ ...styles.largeProfilePic }}
                  />
                )}
                <Title style={{ ...styles.title, textAlign: "center" }}>
                  {focusedMember &&
                    capitalizeFirstLetter(focusedMember.username)}
                </Title>
                {focusedMember && (
                  <Text
                    style={{
                      color: Colors[focusedMember.role],
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {focusedMember.role_display_name}
                  </Text>
                )}
              </View>
            </View>
            <View>
              {focusedMember &&
                isFounder(userRole) &&
                (focusedMember.role != "community_founder" || isAdmin(userRole)) &&
                focusedMember.id != userInfo.id && (
                  <Button
                    mode="contained"
                    icon="account-star"
                    style={styles.button}
                    onPress={() => setRoleMenuVisible(true)}
                  >
                    {capitalizeFirstLetter(t("change_role"))}
                  </Button>
                )}
              {focusedMember && focusedMember.id != userInfo.id && (
                <Button
                  mode="contained"
                  icon="flag"
                  buttonColor={theme.colors.danger}
                  style={styles.button}
                  onPress={handleReportComment}
                >
                  {capitalizeFirstLetter(t("report_member"))}
                </Button>
              )}
              {focusedMember &&
                isModerator(userRole) &&
                focusedMember.id != userInfo.id && (
                  <Button
                    mode="contained"
                    icon="account-remove"
                    buttonColor={theme.colors.danger}
                    style={styles.button}
                    onPress={() => handleExpelMember(focusedMember.id)}
                  >
                    {capitalizeFirstLetter(t("expel_member"))}
                  </Button>
                )}
            </View>
          </View>
        </Modal>
        {/* Modal de confirmación de expulsión */}
        <Modal
          visible={confirmModalVisible}
          onDismiss={() => setConfirmModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {capitalizeFirstLetter(t("confirm_expel_member"))}
            </Text>
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={confirmExpelMember}
                style={styles.button}
                buttonColor={theme.colors.danger}
              >
                {capitalizeFirstLetter(t("yes"))}
              </Button>
              <Button
                mode="contained"
                onPress={() => setConfirmModalVisible(false)}
                style={styles.button}
              >
                {capitalizeFirstLetter(t("no"))}
              </Button>
            </View>
          </View>
        </Modal>
        {/* Menú de cambio de rol */}
        <Menu
          visible={roleMenuVisible}
          style={styles.menu}
          onDismiss={() => setRoleMenuVisible(false)}
          anchor={
            <Button onPress={() => setRoleMenuVisible(true)}>
              {capitalizeFirstLetter(t("change_role"))}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => handleChangeRoleRequest("community_member")}
            title={t("community_member")}
          />
          <Menu.Item
            onPress={() => handleChangeRoleRequest("community_moderator")}
            title={t("community_moderator")}
          />
          <Menu.Item
            onPress={() => handleChangeRoleRequest("community_founder")}
            title={t("community_founder")}
          />
        </Menu>

        {/* Modal de confirmación de cambio de rol */}
        <Modal
          visible={confirmChangeRoleVisible}
          onDismiss={() => setConfirmChangeRoleVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {`${capitalizeFirstLetter(t("confirm_role_change"))}: ${t(
                selectedRole
              )}?`}
            </Text>
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={handleChangeRole}
                style={styles.button}
                buttonColor={theme.colors.danger}
              >
                {capitalizeFirstLetter(t("yes"))}
              </Button>
              <Button
                mode="contained"
                onPress={() => setConfirmChangeRoleVisible(false)}
                style={styles.button}
              >
                {capitalizeFirstLetter(t("no"))}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default MembersTab;
