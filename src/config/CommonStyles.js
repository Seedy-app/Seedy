import { StyleSheet } from "react-native";
import Colors from "./Colors";
import FontSizes from "./FontSizes";

const commonStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    eyeIcon: {
      position: "absolute",
      transform: [{ translateX: 340 }, { translateY: 10 }],
    },
    input: {
      height: 40,
      borderColor: Colors.inputBorder,
      borderWidth: 1,
      marginBottom: 20,
      padding: 10,
      borderRadius: 5,
    },
    button: {
      backgroundColor: Colors.primary,
      padding: 10,
      alignItems: "center",
      borderRadius: 5,
    },
    buttonText: {
      color: Colors.white,
      fontSize: FontSizes.large,
    },
});

export default commonStyles;
