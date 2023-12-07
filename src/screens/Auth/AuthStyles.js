import { StyleSheet, Dimensions } from "react-native";
import commonStyles from "../../config/CommonStyles";
import FontSizes from "../../config/FontSizes";
import Colors from "../../config/Colors";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const screenScale = Dimensions.get("window").scale;

const authStyles = StyleSheet.create({
  ...commonStyles,
  registerText: {
    marginRight: 10,
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
});

export default authStyles;
