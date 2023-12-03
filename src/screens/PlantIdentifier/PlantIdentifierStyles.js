import { StyleSheet, Dimensions } from "react-native";

import commonStyles from "../../config/CommonStyles";

const plantIdentifierStyles = StyleSheet.create({
  ...commonStyles,
  captureButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center", 
    marginBottom: "5%",
  },
  contentText: {
    color: 'gray', 
  },
  section: {
    marginBottom: Dimensions.get("window").scale * 5, 
  },
  captureButton: {
    borderRadius: (Dimensions.get("window").scale * 25) / 2,
    height: Dimensions.get("window").scale * 25,
    width: Dimensions.get("window").scale * 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  plantPic: {
    marginVertical: Dimensions.get("window").scale * 5,
    marginRight: Dimensions.get("window").scale * 5,
    width: Dimensions.get("window").scale * 100,
    height: Dimensions.get("window").scale * 100,
    borderRadius: (Dimensions.get("window").scale * 70) / 4,
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
