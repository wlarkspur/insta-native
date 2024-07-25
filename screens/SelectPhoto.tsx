import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { colors } from "../colors";
import { SelectPhotoProps } from "../interface";
import { StatusBar } from "expo-status-bar";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;

const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

interface ISelectPhoto {
  id: string;
  uri: string;
}

export default function SelectPhoto({ navigation }: SelectPhotoProps) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState<ISelectPhoto[]>([]);
  const [chosenPhoto, setChosenPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const numColumns = 4;

  // 사진의 `uri`를 변환하는 함수
  const getPhotoUri = async (id: string) => {
    try {
      const asset = await MediaLibrary.getAssetInfoAsync(id);
      return asset.localUri || "";
    } catch (error) {
      console.error("Failed to get asset info:", error);
      return "";
    }
  };

  // 사진을 가져오는 함수
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first: 50,
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      });

      // 사진의 `uri`를 비동기로 변환
      const photosWithUris = await Promise.all(
        assets.map(async (photo) => ({
          id: photo.id,
          uri: await getPhotoUri(photo.id),
        }))
      );

      setPhotos(photosWithUris);

      if (photosWithUris.length > 0) {
        setChosenPhoto(photosWithUris[0].uri);
      } else {
        setChosenPhoto(null);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to get photos:", error);
      setLoading(false);
    }
  };

  // 권한을 요청하는 함수
  const getPermissions = async () => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();

    if (status === "denied" && canAskAgain) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        setOk(true);
        getPhotos();
      }
    } else if (status === "granted") {
      setOk(true);
      getPhotos();
    } else {
      setLoading(false); // 권한 거부 상태에서 로딩 종료
    }
  };
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadForm", {
          file: chosenPhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto]);

  // 사진 선택 함수
  const choosePhoto = (uri: string) => {
    setChosenPhoto(uri);
  };

  // FlatList의 renderItem 함수
  const renderItem = ({ item: photo }: { item: ISelectPhoto }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? colors.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );

  if (loading) {
    return (
      <Container>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "white" }}>No Photo Selected</Text>
          </View>
        )}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
