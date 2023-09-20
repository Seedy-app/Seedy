import { StyleSheet } from "react-native";
import Colors from "./Colors";
import FontSizes from "./FontSizes";

const commonStyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      padding: 10
    },
    eyeIcon: {
      position: "absolute",
      transform: [{ translateX: 340 }, { translateY: 10 }],
    },
    input: {
      height: 40,
      borderColor: Colors.gray,
      borderWidth: 1,
      marginBottom: 20,
      padding: 10,
      borderRadius: 5,
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: Colors.primary,
    },
    buttonText: {
      fontSize: FontSizes.large,
      lineHeight: 21,
      letterSpacing: 0.25,
      color: Colors.white,
    },
    justTextButton: {
      fontSize: FontSizes.regular,
      color: Colors.secondary
    },
    otherOptionsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 15,
    },
    error: {
      color: Colors.red,
    },
    label: {
      fontSize: FontSizes.regular
    },
    input: {
      height: 40,
      borderColor: Colors.gray,
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
    },
});

export default commonStyles;
