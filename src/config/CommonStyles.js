import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";
import FontSizes from "./FontSizes";

const commonStyles = StyleSheet.create({
  input: {
    width: "100%",
    marginBottom: Dimensions.get("window").scale * 5,
  },
  viewBorders: {
    borderWidth: 1,
    borderColor: Colors.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 10,
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
    width: "100%"
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
  },
  formPicPreviewView: {
    justifyContent: "center",
    alignItems: "center",
  },
  listCard: {
    marginTop: "1%",
    marginBottom: "1%",
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    borderRadius: 50,
    marginRight: 10,
    width: 100,
    height: 100,
  },
  midProfilePic: {
    borderRadius: 25,
    marginRight: 10,
    width: 50,
    height: 50,
  },
  smallProfilePic: {
    borderRadius: 12,
    marginRight: 10,
    width: 25,
    height: 25,
  },

  // Role
  roleContainer: {
    borderRadius: 5,
    padding: 5,
    marginLeft: "auto",
  },
  roleText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  menu: {
    margin: 10
  },
  
});

export default commonStyles;
