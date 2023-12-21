import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";
import FontSizes from "./FontSizes";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const screenScale = Dimensions.get("window").scale;

const commonStyles = StyleSheet.create({
  input: {
    width: "100%",
    marginBottom: screenScale * 5,
    borderWidth: 1,
    borderColor: "black",
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
    marginVertical: screenScale * 2,
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
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    borderWidth: 1,
    borderColor: "black",
  },
  formPicPreviewView: {
    justifyContent: "center",
    alignItems: "center",
    margin: "1%",
  },
  listCard: {
    marginTop: "1%",
    marginBottom: "1%",
    shadowColor: Colors.shadow,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
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
    borderRadius: screenScale * 20,
    marginRight: "5%",
    width: screenScale * 40,
    height: screenScale * 40,
    borderWidth: 1,
    borderColor: "black",
  },
  midProfilePic: {
    borderRadius: screenScale * 10,
    marginRight: "5%",
    width: screenScale * 20,
    height: screenScale * 20,
    borderWidth: 1,
    borderColor: "black",
  },
  smallProfilePic: {
    borderRadius: screenScale * 6,
    marginRight: "3%",
    width: screenScale * 11,
    height: screenScale * 11,
    borderWidth: 1,
    borderColor: "black",
  },

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
    width: screenScale * 100,
    height: screenScale * 100,
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
  modalContainer: {
    backgroundColor: "white",
    padding: screenScale * 10,
    alignSelf: "center",
    maxHeight: screenHeight * 0.5,
    width: screenWidth * 0.9,
    borderRadius: screenScale * 15,
    borderWidth: 1,
    borderColor: "black",
  },
  modalContent: {
    justifyContent: "space-between",
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  page: {
    margin: 5,
    padding: 5,
  },
  activePage: {
    margin: 5,
    padding: 5,
    fontWeight: "bold",
  },
  toolbar: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 5,
  },
  editorContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  commentView: {
    padding: "1%",
    borderBottomWidth: 1,
    borderColor: "grey",
    flexDirection: "row",
    position: "relative",
  },
  commentInfoBox: {
    alignItems: "center",
    width: Dimensions.get("window").width * 0.2,
    marginRight: "2%",
    borderRightColor: "grey",
    borderRightWidth: 1,
  },
  reactionBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  commentOptionsButton: {
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
});

export default commonStyles;
