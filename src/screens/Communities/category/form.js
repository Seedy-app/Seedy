import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import CustomInput from "../../CustomComponents/CustomInput";
import styles from "../CommunitiesStyles";
import { capitalizeFirstLetter } from "../../../utils/device";
import { useTranslation } from "react-i18next";
import { checkCategoryNameAvailability } from "../../../utils/api";

const CategoryForm = ({ category = null, community_id, onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const n_timeout = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category]);

  const handleNameChange = (text) => {
    setName(text);
    clearTimeout(n_timeout.current);
    n_timeout.current = setTimeout(async () => {
      const result = await checkCategoryNameAvailability(text, community_id, category ? category.id : null);
      if (result.error || result.error == "") {
        setNameError(result.error);
      }
    }, 300);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(name, description);
    }
  };

  return (
    <View style={{ ...styles.container, justifyContent: "center" }}>
      {nameError && <Text style={styles.error}>{nameError}</Text>}
      <CustomInput
        label={capitalizeFirstLetter(t("name"))}
        value={name}
        onChangeText={handleNameChange}
      />
      <CustomInput
        label={capitalizeFirstLetter(t("description"))}
        value={description}
        onChangeText={setDescription}
      />
      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
        {capitalizeFirstLetter(t("submit"))}
      </Button>
    </View>
  );
};

export default CategoryForm;
