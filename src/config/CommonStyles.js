import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";
import FontSizes from "./FontSizes";

const commonStyles = StyleSheet.create({
  input: {
    width: "100%",
    marginBottom: Dimensions.get("window").scale * 5,
    borderWidth: 1,
    borderColor: "black"
  },
  viewBorders: {
    borderWidth: 1,
    borderColor: Colors.black,
  },
  container: {
    flex: 1,
    padding: "1%",
    backgroundColor: Colors.white,
  },
  otherOptionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
  },
  eyeIcon: {
    position: "absolute",
    transform: [{ translateX: 340 }, { translateY: 10 }],
  },
  cardDescription: {
    color: Colors.gray,
    flexShrink: 1,
  },
  button: {
    margin: Dimensions.get("window").scale * 2,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    fontSize: FontSizes.large,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: Colors.white,
  },
  justTextButton: {
    fontSize: FontSizes.regular,
    color: Colors.secondary,
  },
  error: {
    color: Colors.error,
  },
  label: {
    fontSize: FontSizes.regular,
  },
  underInputMessage: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  formPicPreview: {
    width: Dimensions.get("window").scale * 125,
    height: Dimensions.get("window").scale * 125,
    borderWidth: 1,
    borderColor: "black"
  },
  formPicPreviewView: {
    justifyContent: "center",
    alignItems: "center",
  },
  listCard: {
    marginTop: "1%",
    marginBottom: "1%",
    shadowColor: Colors.shadow,
    backgroundColor: Colors. white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: "black",
  },

  fullLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: FontSizes.large,
  },
  largeProfilePic: {
    borderRadius: Dimensions.get("window").scale * 20,
    marginRight: "5%",
    width: Dimensions.get("window").scale * 40,
    height: Dimensions.get("window").scale * 40,
    borderWidth: 1,
    borderColor: "black",
  },
  midProfilePic: {
    borderRadius: Dimensions.get("window").scale * 10,
    marginRight: "5%",
    width: Dimensions.get("window").scale * 20,
    height: Dimensions.get("window").scale * 20,
    borderWidth: 1,
    borderColor: "black",
  },
  smallProfilePic: {
    borderRadius: Dimensions.get("window").scale * 5,
    marginRight: "5%",
    width: Dimensions.get("window").scale * 10,
    height: Dimensions.get("window").scale * 10,
    borderWidth: 1,
    borderColor: "black",
  },

  // Role
  roleContainer: {
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  roleText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  menu: {
    margin: 10,
  },
  searchBar: {
    margin: "2%",
    borderWidth: 1,
    borderColor: "black",
  },
  centeredImage: {
    width: Dimensions.get("window").scale * 100,
    height: Dimensions.get("window").scale * 100,
    resizeMode: "contain",
  },
  screenCenterText: {
    marginTop: "5%",
    marginHorizontal: "10%",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default commonStyles;
