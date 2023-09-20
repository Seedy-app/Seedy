import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../config/CommonStyles";

const CustomInput = ({
  placeholder,
  isPassword,
  isConfirmPassword,
  onChangeText,
  value,
}) => {
  const [isPasswordVisible, setPasswordVisible] = React.useState(true);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(true);

  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!isConfirmPasswordVisible);

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={
          (isPassword && isPasswordVisible) ||
          (isConfirmPassword && isConfirmPasswordVisible)
        }
        value={value}
        autoCapitalize="none"
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}
        >
          <Icon
            name={isPasswordVisible ? "eye-slash" : "eye"}
            size={20}
            color="grey"
          />
        </TouchableOpacity>
      )}
      {isConfirmPassword && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={toggleConfirmPasswordVisibility}
        >
          <Icon
            name={isConfirmPasswordVisible ? "eye-slash" : "eye"}
            size={20}
            color="grey"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;
