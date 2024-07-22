import { Camera, CameraCapturedPicture, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, FlashMode } from "expo-camera/build/legacy/Camera.types";
import React, { useEffect, useState, useRef } from "react";
import { Alert, Image, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Slider from "@react-native-community/slider";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  flex-direction: column;
  padding: 0 50px;
  align-items: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const SliderContainer = styled.View``;
const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;
const PhotoActions = styled(Actions)`
  flex-direction: row;
`;
const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 10px 25px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

export default function TakePhoto({ navigation }: any) {
  const camera = useRef<CameraView | null>(null);
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState<"on" | "off" | "auto">(
    FlashMode.off
  );
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === CameraType.front) {
      setCameraType(CameraType.back);
    } else {
      setCameraType(CameraType.front);
    }
  };
  const onZoomValueChange = (e: any) => {
    setZoom(e);
  };
  const onFlashChange = () => {
    if (flashMode === FlashMode.off) {
      setFlashMode(FlashMode.on);
    } else if (flashMode === FlashMode.on) {
      setFlashMode(FlashMode.auto);
    } else if (flashMode === FlashMode.auto) {
      setFlashMode(FlashMode.off);
    }
  };
  const goToUpload = async (save: any) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    console.log("Will upload", takenPhoto);
  };
  const onUpload = () => {
    Alert.alert("Save photo?", "Save photo & Upload or just Upload", [
      {
        text: "Save & Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Just Upload",
        onPress: () => goToUpload(false),
      },
    ]);
  };
  const onCameraReady = () => setCameraReady(true);
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const result = (await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      })) as CameraCapturedPicture;
      setTakenPhoto(result?.uri);
    }
  };
  const onDismiss = () => setTakenPhoto("");
  return (
    <Container>
      <StatusBar hidden={true} />
      {takenPhoto === "" ? (
        <CameraView
          facing={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flash={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseButton onPress={() => navigation.navigate("Tabs")}>
            <Ionicons
              name="close"
              style={{ color: "white", padding: 5 }}
              size={30}
            />
          </CloseButton>
        </CameraView>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255,255,255,0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    flashMode === FlashMode.off
                      ? "flash-off"
                      : flashMode === FlashMode.on
                      ? "flash"
                      : "eye"
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    cameraType === CameraType.front
                      ? "camera-reverse"
                      : "camera"
                  }
                />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        <PhotoActions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dissmiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </PhotoActions>
      )}
    </Container>
  );
}
