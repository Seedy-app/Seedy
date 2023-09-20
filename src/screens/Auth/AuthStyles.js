import { StyleSheet } from "react-native";
import commonStyles from "../../config/CommonStyles";
import FontSizes from "../../config/FontSizes";
import Colors from "../../config/Colors";


const authStyles = StyleSheet.create({
    ...commonStyles,
    registerText: {
      marginRight: 10,
      fontSize: FontSizes.regular,
    },
    registerButton: {
      fontSize: FontSizes.regular,
    },
    buttonDisabled: {
      backgroundColor: Colors.gray,
    },
    loginContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 15,
    },
    loginText: {
      marginRight: 10,
      fontSize: FontSizes.regular,
    },
    loginButton: {
      fontSize: FontSizes.regular,
    },
});

export default authStyles;
