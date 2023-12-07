import { StyleSheet, Dimensions } from "react-native";

import commonStyles from "../../config/CommonStyles";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const screenScale = Dimensions.get("window").scale;

const plantIdentifierStyles = StyleSheet.create({
  ...commonStyles,
  captureButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "5%",
  },
  contentText: {
    color: "gray",
  },
  section: {
    marginBottom: screenScale * 5,
  },
  captureButton: {
    borderRadius: (screenScale * 25) / 2,
    height: screenScale * 25,
    width: screenScale * 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  plantPic: {
    marginVertical: screenScale * 5,
    marginRight: screenScale * 5,
    width: screenScale * 100,
    height: screenScale * 100,
    borderRadius: (screenScale * 70) / 4,
    borderWidth: 1,
    borderColor: "black",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default plantIdentifierStyles;
