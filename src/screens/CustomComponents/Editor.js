import React, { useState, forwardRef } from "react";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import styles from "../../config/CommonStyles";
import { Button, Modal, Portal } from "react-native-paper";
import {
  capitalizeFirstLetter,
  selectImageFromGallery,
} from "../../utils/device";
import { uploadPictureToServer } from "../../utils/api";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";
import CustomInput from "./CustomInput";
import Config from "../../config/Config";

const Editor = forwardRef(({ toolbarActions, user_id, type }, ref) => {
  const { t } = useTranslation();
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const handleInsertImage = async () => {
    const image = await selectImageFromGallery();
    const imageUrl = await uploadPictureToServer(
      `image_${Date.now()}`,
      `users/${user_id}/${type}/`,
      image
    );
    if (imageUrl) {
      ref.current?.insertImage(Config.API_URL + imageUrl);
    }
  };

  const handleInsertLink = () => {
    setLinkModalVisible(true);
  };

  return (
    <>
      <RichToolbar
        style={styles.toolbar}
        editor={ref}
        actions={toolbarActions}
        iconMap={{
          heading1: require("../../assets/images/icons/title.png"),
          bold: require("../../assets/images/icons/bold.png"),
          italic: require("../../assets/images/icons/italic.png"),
          underline: require("../../assets/images/icons/underline.png"),
          insertImage: require("../../assets/images/icons/image.png"),
          insertLink: require("../../assets/images/icons/link.png"),
          // insertPlant: require("../../assets/images/icons/flower.png"),
        }}
        onPressAddImage={handleInsertImage}
        onInsertLink={handleInsertLink}
      />
      <RichEditor
        androidLayerType="software"
        containerStyle={{
          ...styles.editorContainer,
          maxHeight:
            type === "post"
              ? Dimensions.get("window").height * 0.4
              : Dimensions.get("window").height * 0.15,
        }}
        ref={ref}
        placeholder={t("start_writing_message")}
        initialHeight={
          type === "post"
            ? Dimensions.get("window").height * 0.4
            : Dimensions.get("window").height * 0.15
        }
      />
      <Portal>
        <Modal
          visible={linkModalVisible}
          onDismiss={() => setLinkModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <CustomInput
            label="URL"
            value={linkUrl}
            onChangeText={(text) => setLinkUrl(text)}
          />
          <Button
            mode="contained"
            onPress={() => {
              ref.current?.insertLink(linkUrl, linkUrl);
              setLinkUrl("");
              setLinkModalVisible(false);
            }}
          >
            {capitalizeFirstLetter(t("insert_link"))}
          </Button>
        </Modal>
      </Portal>
    </>
  );
});

export default Editor;
