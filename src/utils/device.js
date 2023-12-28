import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const selectImageFromGallery = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(capitalizeFirstLetter(t("error")), t("need_gallery_permission"));
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const hexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const isModerator = (userRole) => {
  return userRole && ["system_admin", "community_founder", "community_moderator"].includes(userRole.name);
};

export const isFounder = (userRole) => {
  return userRole && ["system_admin", "community_founder"].includes(userRole.name);
};
