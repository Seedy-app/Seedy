import { StyleSheet } from "react-native";
import commonStyles from "../../config/CommonStyles";

const signUpStyles = StyleSheet.create({
    ...commonStyles,
    error: {
      color: "red",
    },
    buttonDisabled: {
      backgroundColor: "gray",
    },
    loginContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 15,
    },
    loginText: {
      marginRight: 10,
      fontSize: 16,
    },
    loginButton: {
      fontSize: 16,
      color: "blue",
    },
});

export default signUpStyles;
