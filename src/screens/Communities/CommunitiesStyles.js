import { StyleSheet, Dimensions } from "react-native";
import commonStyles from "../../config/CommonStyles";
import Colors from "../../config/Colors";
import FontSize from "../../config/FontSizes";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const screenScale = Dimensions.get("window").scale;

const communitiesStyles = StyleSheet.create({
  ...commonStyles,
  communitiesContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
  },
  communityCreatePic: {
    borderRadius: screenScale * 15,
  },
  tab: {
    backgroundColor: Colors.white,
  },
  tabLabel: {
    color: Colors.black,
  },
  header: {
    paddingLeft: screenScale * 7,
    alignItems: "center",
    marginTop: screenScale * 2,
    marginBottom: screenScale * 2,
    borderRadius: screenScale * 10,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    ...commonStyles.viewBorders,
  },
  headerText: {
    color: Colors.white,
    fontSize: FontSize.regular,
    fontWeight: "bold",
  },
  modalText: {
    marginTop: screenScale * 5,
    marginBottom: screenScale * 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  postCount: {
    alignItems:"center",
    borderTopWidth: 1,
    borderTopColor: "black",
    marginTop: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginBottom: 10,
    paddingBottom: 10,
  },
  postCountText: {
    fontWeight: "bold",
  },
  communityCardTitle: {
    fontSize: FontSize.large,
  },
  communityCardSubitle: {
    fontSize: FontSize.regular,
  },
  communityPreview: {
    borderWidth: 1,
    borderColor: "black",
  },
  communityPreviewCover: {
    marginVertical: "4%",
    marginHorizontal: "1%",
    borderWidth: 1,
    borderColor: "black",
  },
  toolbar: {
    ...commonStyles.viewBorders,
    borderRadius: 10,
    marginBottom: 5,
  },
  editorContainer: {
    ...commonStyles.viewBorders,
    borderRadius: 10,
    maxHeight: screenHeight * 0.4,
  },
  selectCategoriesModalContainer: {
    ...commonStyles.modalContainer,
  },
});

export default communitiesStyles;
