import { Camera, CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { CameraType } from "expo-camera/build/legacy/Camera.types";

import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

export default function TakePhoto() {
  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <Container>
      <CameraView facing={cameraType} style={{ flex: 1 }} />
      <Actions>
        <TakePhotoBtn></TakePhotoBtn>
        <TouchableOpacity></TouchableOpacity>
      </Actions>
    </Container>
  );
}
