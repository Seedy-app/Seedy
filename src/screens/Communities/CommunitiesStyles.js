import { StyleSheet, Dimensions } from "react-native";
import commonStyles from "../../config/CommonStyles";
import Colors from "../../config/Colors";
import FontSize from "../../config/FontSizes";

const communitiesStyles = StyleSheet.create({
  ...commonStyles,
  communitiesContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
  },
  communityCreatePic: {
    borderRadius: Dimensions.get("window").scale * 15,
  },
  tab: {
    backgroundColor: Colors.white,
  },
  tabLabel: {
    color: Colors.black,
  },
  header: {
    paddingLeft: Dimensions.get("window").scale * 7,
    alignItems: "center",
    backgroundColor: Colors.primary,
    marginTop: Dimensions.get("window").scale * 2,
    marginBottom: Dimensions.get("window").scale * 2,
    borderRadius: Dimensions.get("window").scale * 10,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    color: Colors.white,
    fontSize: FontSize.regular,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: Dimensions.get("window").scale * 10,
    marginLeft: Dimensions.get("window").scale * 10,
    marginRight: Dimensions.get("window").scale * 10,
    borderRadius: Dimensions.get("window").scale * 15,
  },
  modalContent: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    marginTop: Dimensions.get("window").scale * 5,
    marginBottom: Dimensions.get("window").scale * 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    width: "100%",
    marginBottom: Dimensions.get("window").scale * 10,
  },
});

export default communitiesStyles;
