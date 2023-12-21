import { Dimensions, StyleSheet } from "react-native";
import commonStyles from "../../config/CommonStyles";
import Colors from "../../config/Colors";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const screenScale = Dimensions.get("window").scale;

const profileStyles = StyleSheet.create({
  ...commonStyles,
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: "5%",
  },
  userInfo: {
    flexDirection: "column",
    flexShrink:1
  },
  email: {
    color: Colors.gray,
  },
  FormProfilePic: {
    borderRadius: screenScale * 100,
  },
});

export default profileStyles;
