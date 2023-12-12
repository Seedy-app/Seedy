import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  Dimensions,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Button, Modal, Portal, useTheme, TextInput } from "react-native-paper";
import styles from "../CommunitiesStyles";
import CustomInput from "../../CustomInput";
import {
  capitalizeFirstLetter,
  selectImageFromGallery,
} from "../../../utils/device";
import { useTranslation } from "react-i18next";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import {
  uploadPictureToServer,
  getCommunityCategories,
  createPost,
} from "../../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../../config/Config";

const CreatePostScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { communityId } = route.params;
  const RichText = useRef();
  const [userInfo, setUserInfo] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLinkModalVisible, setLinkModalVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    };
    const fetchCommunityCategories = async () => {
      try {
        let data = await getCommunityCategories(communityId);
        setCategories(data.categories);
        setFilteredCategories(data.categories);
      } catch (error) {
        console.error("Error fetching community categories:", error);
      }
    };
    fetchUserInfo();
    fetchCommunityCategories();
  }, []);

  const selectCategory = (category) => {
    setCategory(category);
    setModalVisible(false);
  };
  const handleSearch = (query) => {
    const updatedList = categories.filter((cat) =>
      cat.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(updatedList);
  };
  const handleSubmit = async () => {
    try {
      if (!category) {
        alert(t("no_category_selected_error"));
        return;
      }
      const post_response = await createPost(title, body, category.id);
      if (post_response) {
        Alert.alert(
          capitalizeFirstLetter(t("success")),
          capitalizeFirstLetter(t("succesful_post_text"))
        );
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInsertImage = async () => {
    const image = await selectImageFromGallery();
    const imageUrl = await uploadPictureToServer(
      `image_${Date.now()}`,
      `users/${userInfo.id}/posts/`,
      image
    );
    if (imageUrl) {
      RichText.current?.insertImage(Config.API_URL + imageUrl);
    }
  };

  const handleInsertLink = () => {
    setLinkModalVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView keyboardDismissMode={"none"}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 80}
          style={{ flex: 1 }}
        >
          <View>
            <CustomInput
              label={capitalizeFirstLetter(t("title"))}
              onChangeText={setTitle}
            />
          </View>
          <View>
            <RichToolbar
              style={styles.toolbar}
              editor={RichText}
              actions={[
                actions.heading1,
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertImage,
                actions.insertLink,
                // "insertPlant",
              ]}
              iconMap={{
                heading1: require("../../../assets/images/icons/title.png"),
                bold: require("../../../assets/images/icons/bold.png"),
                italic: require("../../../assets/images/icons/italic.png"),
                underline: require("../../../assets/images/icons/underline.png"),
                insertImage: require("../../../assets/images/icons/image.png"),
                insertLink: require("../../../assets/images/icons/link.png"),
                // insertPlant: require("../../../assets/images/icons/flower.png"),
              }}
              onPressAddImage={handleInsertImage}
              onInsertLink={handleInsertLink}
            />
            <RichEditor
              containerStyle={styles.editorContainer}
              ref={RichText}
              placeholder={"Start Writing Here"}
              onChange={(text) => setBody(text)}
              initialHeight={Dimensions.get("window").height * 0.4}
            />
          </View>
          <View>
            <Button
              style={styles.button}
              mode="contained-tonal"
              onPress={() => setModalVisible(true)}
            >
              {category
                ? capitalizeFirstLetter(category.name)
                : capitalizeFirstLetter(t("select_category"))}
            </Button>
          </View>
          <Button style={styles.button} mode="contained" onPress={handleSubmit}>
            {capitalizeFirstLetter(t("post_button_text"))}
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.selectCategoriesModalContainer}
        >
          <CustomInput
            label={capitalizeFirstLetter(t("search_category"))}
            onChangeText={handleSearch}
          />
          <ScrollView>
            {filteredCategories.map((cat, index) => (
              <Button
                key={index}
                onPress={() => {
                  selectCategory(cat);
                  setModalVisible(false);
                }}
                mode="text"
                textColor="black"
              >
                {capitalizeFirstLetter(cat.name)}
              </Button>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={isLinkModalVisible}
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
              RichText.current?.insertLink(linkUrl, linkUrl);
              setLinkUrl("");
              setLinkModalVisible(false);
            }}
          >
            {capitalizeFirstLetter(t("insert_link"))}
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default CreatePostScreen;
