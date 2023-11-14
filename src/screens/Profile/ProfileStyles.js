import { Dimensions, StyleSheet } from "react-native";
import commonStyles from "../../config/CommonStyles";
import Colors from "../../config/Colors";

const profileStyles = StyleSheet.create({
    ...commonStyles,
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      userInfo: {
        flexDirection: 'column'
      },
      email: {
        color: Colors.gray
      },
      FormProfilePic: {
        borderRadius: Dimensions.get("window").width/2,
      },
});

export default profileStyles;
