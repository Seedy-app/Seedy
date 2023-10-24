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
  communityShowPic: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  communityCreatePic: {
    borderRadius: Dimensions.get("window").width / 4,
  },
  communityShortInfo: {
    paddingLeft: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: Dimensions.get("window").width - 80,
  },
  communityDescription: {
    color: Colors.gray,
    flexShrink: 1
  },
  tab: {
    backgroundColor: Colors.white,
  },
  tabLabel: {
    color: Colors.black,
  },
});

export default communitiesStyles;
