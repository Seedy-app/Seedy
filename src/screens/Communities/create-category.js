import React, { useState, useRef } from "react";
import { View, Alert, Text } from "react-native";
import { Button } from "react-native-paper";
import styles from "./CommunitiesStyles";
import CustomInput from "../CustomInput";
import { capitalizeFirstLetter } from "../../utils/device";
import { useTranslation } from "react-i18next";
import { createCategory, checkCategoryNameAvailability } from "../../utils/api";

const CreateCategoryScreen = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const { t } = useTranslation();
  const { communityId } = route.params;
  const n_timeout = useRef(null);

  const handleSubmit = async () => {
    try {
      const post_response = await createCategory(
        name,
        description,
        communityId
      );
      if (post_response) {
        Alert.alert(
          capitalizeFirstLetter(t("success")),
          capitalizeFirstLetter(t("succesful_category_creation_text"))
        );
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (text) => {
    setName(text);
    clearTimeout(n_timeout.current);
    n_timeout.current = setTimeout(async () => {
      const result = await checkCategoryNameAvailability(text, communityId);
      if (result.error || result.error == "") {
        setNameError(result.error);
      }
    }, 300);
  };

  return (
    <View style={{ ...styles.container, justifyContent: "center" }}>
      {nameError && <Text style={styles.error}>{nameError}</Text>}
      <CustomInput
        label={capitalizeFirstLetter(t("name"))}
        onChangeText={handleNameChange}
      />
      <CustomInput
        label={capitalizeFirstLetter(t("description"))}
        onChangeText={setDescription}
      />
      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
        {capitalizeFirstLetter(t("create"))}
      </Button>
    </View>
  );
};

export default CreateCategoryScreen;
