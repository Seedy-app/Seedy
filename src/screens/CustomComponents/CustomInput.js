import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "../../config/CommonStyles";

const CustomInput = ({
  label,
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
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { paddingRight: 40 }]}
        label={label}
        onChangeText={onChangeText}
        secureTextEntry={
          (isPassword && isPasswordVisible) ||
          (isConfirmPassword && isConfirmPasswordVisible)
        }
        value={value}
        autoCapitalize="none"
        right={
          (isPassword || isConfirmPassword) && (
            <TextInput.Icon
              icon={
                isPassword
                  ? isPasswordVisible
                    ? "eye-off"
                    : "eye"
                  : isConfirmPasswordVisible
                  ? "eye-off"
                  : "eye"
              }
              size={20}
              color="grey"
              onPress={
                isPassword
                  ? togglePasswordVisibility
                  : toggleConfirmPasswordVisibility
              }
            />
          )
        }
      />
    </View>
  );
};

export default CustomInput;
