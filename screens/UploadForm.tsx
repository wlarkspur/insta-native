import React, { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { colors } from "../colors";
import { NavigationProp } from "@react-navigation/native";
import { gql, useApolloClient, useMutation } from "@apollo/client";

import { FEED_PHOTO_FRAGMENT } from "../fragments";
import ReactNativeFile from "../ReactNativeFileCustom";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhotoFragment
    }
  }
  ${FEED_PHOTO_FRAGMENT}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100%;
`;
const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

interface IUploadForm {
  route: {
    key: string;
    params: {
      file: string;
    };
    path: string;
  };
  navigation: NavigationProp<any>;
}

export default function UploadForm({ route, navigation }: IUploadForm) {
  const { register, handleSubmit, setValue } = useForm();

  const updateUploadPhoto = (cache: any, result: any) => {
    console.log("result 자료값 ", result);
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      const newPhotoRef = cache.writeFragment({
        id: `Photo:${uploadPhoto.id}`,
        fragment: FEED_PHOTO_FRAGMENT,
        data: uploadPhoto,
        fragmentName: "FeedPhotoFragment",
      });

      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeFeed(prev: any[] = []) {
            return [newPhotoRef, ...prev];
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };

  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: updateUploadPhoto,
    }
  );

  /* const onValid = async ({ caption }: any) => {
    try {
      const filepath = route.params.file;
      const response = await fetch(filepath);
      const blob = await response.blob();

      console.log("blob 값", blob);
      console.log("response url 값", response.url);

      const file = new File([blob], "photo.heic", {
        type: blob.type,
      });

      console.log("File Size:", file.size);
      console.log("File Type:", file.type);
      if (blob.size === 0) {
        console.error("파일이 비어 있습니다.");
        return;
      }

      await uploadPhotoMutation({
        variables: {
          file, // Pass the file directly,
          caption,
        },
      });
    } catch (error) {
      console.error("에러발생", error); // 에러가 발생한 경우 에러를 출력
    }
  }; */
  const onValid = ({ caption }: any) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `photo.jpg`,
      type: "image/jpeg",
    });
    uploadPhotoMutation({
      variables: {
        caption,
        file,
      },
    });
  };
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  useEffect(() => {
    register("caption");
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            returnKeyType="done"
            placeholder="Write a caption..."
            placeholderTextColor="rgba(0,0,0,0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("caption", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
