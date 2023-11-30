import { StyleSheet, Dimensions } from "react-native";
import commonStyles from "../../config/CommonStyles";

const myPlantsStyles = StyleSheet.create({
  ...commonStyles,

  plantCard: {
    borderWidth: 5,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  noPlantsText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardBackground: {
    width: "100%",
    height: Dimensions.get("window").height / 2.5,
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
    width: Dimensions.get("window").scale * 50,
    height: Dimensions.get("window").scale * 50,
    marginRight: 10,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  dialog: {
    borderWidth: 2,
    borderRadius: Dimensions.get("window").scale * 10,
    overflow: "hidden",
  },
  dialogImage: {
    width: 300,
    height: 400,
    borderRadius: Dimensions.get("window").scale * 10,
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
});

export default myPlantsStyles;
