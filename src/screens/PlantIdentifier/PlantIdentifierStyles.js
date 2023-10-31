import { StyleSheet, Dimensions } from "react-native";
import commonStyles from "../../config/CommonStyles";
import Colors from "../../config/Colors";

const button_diameter = Dimensions.get("window").width*0.15 //El diametro del boton es el 15% del ancho del dispositivo

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
        borderRadius: button_diameter/2,
        height: button_diameter,
        width: button_diameter,
        alignItems: 'center',  
        justifyContent: "center",
      },});

export default plantIdentifierStyles;
