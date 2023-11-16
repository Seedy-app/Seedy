import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Camera } from "expo-camera";
import { IconButton } from "react-native-paper";
import styles from "./PlantIdentifierStyles";
import { identifyPlant, uploadPictureToServer } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

export default function TakePictureScreen({ navigation }) {
  const { t } = useTranslation();
  const theme = useTheme();

  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const [cameraKey, setCameraKey] = useState(1);
  const [userId, setUserId] = useState(null);

  const fetchUserInfo = async () => {
    const storedUserInfo = await AsyncStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUserId(parsedInfo.id);
    }
  };

  useEffect(() => {
    askForCameraPermission();
    fetchUserInfo();
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
    if (isCameraReady && cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        const image = await uploadPictureToServer(
          `plant_${Date.now()}`,
          `users/${userId}`,
          photo.uri
        );
        const response = await identifyPlant(image);
        if (response.status === 200) {
          const results = await response.json();
          navigation.navigate(t("identify_plant"), { results });
        } else {
          Alert.alert(
            t("identification_error_title"),
            t("identification_error_message"),
            [
              {
                text: t("try_again"),
              },
            ],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error("takePicture error:", error);
        Alert.alert(
          t("unexpected_error_title"),
          t("unexpected_error_message"),
          [
            {
              text: t("ok"),
            },
          ],
          { cancelable: false }
        );
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.someTextStyle}>{t("no_acces_to_camera")}</Text>;
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
        <View style={styles.captureButtonContainer}>
          <IconButton
            icon="magnify"
            iconColor="white"
            size={40}
            style={[
              styles.captureButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => takePicture(this.camera)}
          />
        </View>
      </Camera>
    </View>
  );
}
