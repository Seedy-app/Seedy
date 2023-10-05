import { StyleSheet, Dimensions } from "react-native";
import commonStyles from "../../config/CommonStyles";
import FontSizes from "../../config/FontSizes";
import Colors from "../../config/Colors";

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
  communityCreatePic: {
    borderRadius: Dimensions.get("window").width/4,
  },
  communityShortInfo: {
    paddingLeft: 20,
  },
  communityDescription: {
    marginTop: 5,
  },
  tab: {
    backgroundColor: Colors.white,
  },
  tabLabel: {
    color: Colors.black,
  },
});

export default communitiesStyles;
