import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useTranslation } from "react-i18next";
import Foundation from "react-native-vector-icons/Foundation";
import styles from "./PlantIdentifierStyles";

export default function TakePictureScreen({ navigation }) {
  const { t } = useTranslation();

  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const [cameraKey, setCameraKey] = useState(1);

  useEffect(() => {
    askForCameraPermission();
  }, []);

  useEffect(() => {
    // Esto sirve para cambiar el key de la camara asi se vuelve a inicializar cuando vuelvo atras en el Stack navigator
    const unsubscribe = navigation.addListener("focus", () => {
      setCameraKey((prevKey) => prevKey + 1);
    });

    return unsubscribe;
  }, [navigation]);

  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const onCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async (cameraRef) => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      // Aquí puedes hacer algo con la foto, como enviarla a un servidor
      navigation.navigate(t("identify_plant"));
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>{t("no_acces_to_camera")}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        key={cameraKey}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={(ref) => {
          this.camera = ref;
        }}
        onCameraReady={onCameraReady}
      >
        <View style={[styles.buttonContainer, styles.viewBorders]}>
          <TouchableOpacity
            style={[styles.captureButton, styles.viewBorders]}
            onPress={() => takePicture(this.camera)}
          >
            <Foundation name="magnifying-glass" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
