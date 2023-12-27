import React, { useState, useEffect } from "react";
import { View, Alert, Image } from "react-native";
import { Camera } from "expo-camera";
import { IconButton, Text } from "react-native-paper";
import styles from "./PlantIdentifierStyles";
import { identifyPlant, uploadPictureToServer } from "../../utils/api";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import IdentifyingImage from "../../assets/images/identifying.gif";

export default function TakePictureScreen({ navigation }) {
  const { t } = useTranslation();
  const theme = useTheme();

  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const [cameraKey, setCameraKey] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    askForCameraPermission();
  }, []);

  useEffect(() => {
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
        setIsLoading(true);
        const image = await uploadPictureToServer(
          `plant_${Date.now()}`,
          `plants`,
          photo.uri
        );
        const results = await identifyPlant(image);
        setIsLoading(false);
        if (results) {
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
        Sentry.captureException(error);
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
      } finally {
        setIsLoading(false);
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
      {isLoading ? (
        <View style={styles.centeredView}>
          <Image source={IdentifyingImage} style={styles.centeredImage} />
          <Text
            style={{
              ...styles.screenCenterText,
              color: theme.colors.secondary,
            }}
          >
            {t("identifying_plant_text")}
          </Text>
        </View>
      ) : (
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
      )}
    </View>
  );
}
