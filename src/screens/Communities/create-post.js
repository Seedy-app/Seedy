import React, { useState, useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  Dimensions,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import styles from "./CommunitiesStyles";
import CustomInput from "../CustomInput";
import { capitalizeFirstLetter } from "../../utils/device";
import { useTranslation } from "react-i18next";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const CreatePostScreen = () => {
  const { t } = useTranslation();
  const RichText = useRef();
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([
    "Categoría 1",
    "Categoría 2",
    "Categoría 3",
    "Categoría 4",
    "Categoría 5",
    "Categoría 6",
    "Categoría 7",
    "Categoría 8",
  ]); // Ejemplo de categorías, puedes ajustar esto según tus necesidades
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const selectCategory = (category) => {
    setCategory(category);
    setModalVisible(false);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    const updatedList = categories.filter((cat) =>
      cat.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(updatedList);
  };
  const handleSubmit = () => {
    if (!category) {
      alert(t('no_category_selected_error'));
      return;
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
              onChangeText={setTitle}
            />
          </View>
          <View>
            <RichToolbar style={styles.toolbar} editor={RichText} />
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
                ? category
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
          <ScrollView style={styles.modalScrollView}>
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
                {cat}
              </Button>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default CreatePostScreen;
