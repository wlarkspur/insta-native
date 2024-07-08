import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components/native";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Likes = styled.Text`
  color: white;
  margin: 8px 0;
  font-weight: 600;
`;

const ExtaContainer = styled.View`
  padding: 10px;
`;

interface IFeedPhoto {
  id: number;
  user: {
    id: number;
    username: string;
    avatar?: string;
  };
  file: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  fullView: any;
}
type RootStackParamList = {
  Profile:
    | {
        user: {
          id: number;
          username: string;
          avatar?: string;
        };
      }
    | undefined;
  Likes: { photoId: number } | undefined;
  Comments: undefined;
};

type PhotoNavStackProp = NativeStackNavigationProp<
  RootStackParamList,
  `Profile`
>;

export default function NavPhoto({
  id,
  user,
  file,
  caption,
  likes,
  isLiked,
  fullView,
}: IFeedPhoto) {
  const navigation = useNavigation<PhotoNavStackProp>();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    Image.getSize(
      file,
      (width, height) => {
        setImageHeight(height / 3);
        setImageError(false);
      },
      () => {
        setImageError(true);
      }
    );
  }, [file]);
  const goToProfile = () => {
    navigation.navigate("Profile", {
      user: {
        id,
        username: user.username,
        avatar: user.avatar,
      },
    });
  };
  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        resizeMode="cover"
        style={{
          width,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />
      <ExtaContainer>
        <Actions>
          <Action>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "white"}
              size={20}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons name="chatbubble-outline" color="white" size={20} />
          </Action>
        </Actions>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Likes", {
              photoId: id,
            })
          }
        >
          <Likes>{likes === 1 ? "1 like" : `${likes}likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={goToProfile}>
            <Username>{user.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtaContainer>
    </Container>
  );
}
