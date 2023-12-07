import { StyleSheet, Dimensions } from "react-native";
import commonStyles from "../../config/CommonStyles";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const screenScale = Dimensions.get("window").scale;

const myPlantsStyles = StyleSheet.create({
  ...commonStyles,

  plantCard: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: "1%",
  },
  plantCardContent: {
    fontSize: 14,
    color: "white",
  },
  plantCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  plantCardSubtitle: {
    fontSize: 14,
    color: "white",
  },
  cardBackground: {
    width: "100%",
    height: screenHeight / 2.5,
    justifyContent: "flex-end",
    borderRadius: 50,
  },
  overlayContainer: {
    padding: 10,
  },
  modalContainerStyle: {
    backgroundColor: "white",
    paddingTop: 50,
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    ...commonStyles.viewBorders,
  },
  modalInfoContainer: {
    marginHorizontal: "5%",
    marginBottom: "5%",
  },
  optionsButtonStyle: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  closeButtonStyle: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  imagesScrollViewStyle: {},
  imageStyle: {
    width: screenScale * 50,
    height: screenScale * 50,
    marginRight: 10,
    ...commonStyles.viewBorders,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  dialog: {
    borderWidth: 2,
    borderRadius: screenScale * 10,
    overflow: "hidden",
  },
  dialogImage: {
    width: 300,
    height: 400,
    borderRadius: screenScale * 10,
    borderWidth: 1,
    borderColor: "black",
  },
  listImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  listTitle: {
    fontWeight: "bold",
  },
  listSubtitle: {
    color: "grey",
  },
  dialogImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  disclaimer: {
    margin: "2%",
    padding: "2%",
    color: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default myPlantsStyles;
