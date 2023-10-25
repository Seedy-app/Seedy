import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";
import FontSizes from "./FontSizes";

const commonStyles = StyleSheet.create({
  viewBorders: {
    borderWidth: 1,
    borderColor: 'black'
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  eyeIcon: {
    position: "absolute",
    transform: [{ translateX: 340 }, { translateY: 10 }],
  },
  input: {
    height: 40,
    borderColor: Colors.gray,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  cardDescription: {
    color: Colors.gray,
    flexShrink: 1
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.primary,
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
  input: {
    height: 40,
    borderColor: Colors.gray,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  underInputMessage: {
    fontSize: FontSizes.small,
    color: Colors.gray,
  },
  formPicPreview: {
    width: Dimensions.get("window").width / 1.25,
    height: Dimensions.get("window").width / 1.25,
  },
  formPicPreviewView: {
    justifyContent: "center",
    alignItems: "center",
  },
  listCard: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  fullLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Texts
  title: {
    fontSize: FontSizes.large,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: FontSizes.large,
  },

  // Profile picture
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
    borderRadius: 5, // Bordes redondeados
    padding: 5, // Espaciado interno
    marginLeft: "auto", // Alineación a la derecha
  },
  roleText: {
    color: Colors.white, 
    fontWeight: "bold" 
  },
});

export default commonStyles;
