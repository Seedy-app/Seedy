import { StyleSheet } from "react-native";
import commonStyles from "../../config/CommonStyles";

const loginStyles = StyleSheet.create({
    ...commonStyles,
    registerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 15,
    },
    registerText: {
      marginRight: 10,
      fontSize: 16,
    },
    registerButton: {
      fontSize: 16,
      color: "blue",
    },
});

export default loginStyles;
