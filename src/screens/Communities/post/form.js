import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import CustomInput from "../../CustomComponents/CustomInput";
import Editor from "../../CustomComponents/Editor";
import { capitalizeFirstLetter } from "../../../utils/device";
import { useTranslation } from "react-i18next";
import { actions } from "react-native-pell-rich-editor";
import { getCommunityCategories, getPostContentById } from "../../../utils/api";
import styles from "../CommunitiesStyles";

const PostForm = ({ user_id, community_id, onSubmit, post = null }) => {
  const { t } = useTranslation();
  const richText = useRef();
  const [title, setTitle] = useState(post.title || "");
  const [category, setCategory] = useState(post.category || null);
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    const fetchCommunityCategories = async () => {
      try {
        let data = await getCommunityCategories(community_id);
        setCategories(data.categories);
        setFilteredCategories(data.categories);
      } catch (error) {
        console.error("Error fetching community categories:", error);
      }
    };
    const fetchPostContent = async () => {
      try {
        if (post) {
          let response = await getPostContentById(post.id);
          richText.current?.setContentHTML(response.content);
        }
      } catch (error) {
        console.error("Error fetching post content:", error);
      }
    };
    fetchPostContent();
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
    let body = await richText.current?.getContentHtml();
    const formData = {
      title,
      body,
      category,
    };
    if (post) {
      formData.post_id = post.id;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
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
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <Editor
            toolbarActions={[
              actions.heading1,
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertImage,
              actions.insertLink,
            ]}
            user_id={user_id}
            type="post"
            ref={richText}
          />
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
    </SafeAreaView>
  );
};

export default PostForm;
