import { StyleSheet, Dimensions } from "react-native";
import commonStyles from "../../config/CommonStyles";
import Colors from "../../config/Colors";


const plantIdentifierStyles = StyleSheet.create({
    ...commonStyles,
    buttonContainer: {
        position: 'absolute', 
        bottom: 0,            
        left: 0,              
        right: 0,             
        alignItems: 'center',  
        marginBottom: 20,     
      },
      captureButton: {
        backgroundColor: Colors.primary,
        borderRadius: (Dimensions.get("window").width*0.15)/2,
        height: Dimensions.get("window").width*0.15,
        width: Dimensions.get("window").width*0.15,
        alignItems: 'center',  
        justifyContent: "center",
      },
      plantPic: {
        width: Dimensions.get("window").width*0.75,
        height: Dimensions.get("window").width*0.75,
        borderRadius: (Dimensions.get("window").width*0.75)/4,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

export default plantIdentifierStyles;
