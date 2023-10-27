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
  communityListPic: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  communityShowPic: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  communityCreatePic: {
    borderRadius: Dimensions.get("window").width / 4,
  },
  communityShortInfo: {
    flexWrap: "wrap",
    maxWidth: Dimensions.get("window").width - 80,
  },
  tab: {
    backgroundColor: Colors.white,
  },
  tabLabel: {
    color: Colors.black,
  },
  header: {
    backgroundColor: Colors.primary,
    marginBottom: 2,
    borderRadius: 3,
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
});

export default communitiesStyles;
