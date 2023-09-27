import * as ImagePicker from "expo-image-picker";

export const selectImageFromGallery = async (filename, filepath) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert(t("need_gallery_permission"));
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



