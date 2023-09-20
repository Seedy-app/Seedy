import { StyleSheet } from "react-native";
import commonStyles from "../../config/CommonStyles";

const profileStyles = StyleSheet.create({
    ...commonStyles,
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
      },
      profileButtons: {
        marginTop: 10,
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10
      },
      userInfo: {
        flexDirection: 'column'
      },
      username: {
        fontWeight: 'bold',
        fontSize: 20
      },
      email: {
        fontSize: 18,
        color: 'gray'
      }
});

export default profileStyles;
