import { Dimensions, StyleSheet } from "react-native";
import commonStyles from "../../config/CommonStyles";
import FontSizes from "../../config/FontSizes";
import Colors from "../../config/Colors";

const profileStyles = StyleSheet.create({
    ...commonStyles,
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      profileButtons: {
        marginTop: 10,
      },
      userInfo: {
        flexDirection: 'column'
      },
      email: {
        fontSize: FontSizes.regular,
        color: Colors.gray
      },
      FormProfilePic: {
        borderRadius: Dimensions.get("window").width/2,
      },
});

export default profileStyles;
