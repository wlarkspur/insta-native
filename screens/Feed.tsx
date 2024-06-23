import { FlatList, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedInVar, tokenVar } from "../apollo";
import { styled } from "styled-components/native";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import NavPhoto from "../components/NavPhoto";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

interface IPhoto {
  caption: string;
  commentNumber: number;
  comments: Comment[];
  createdAt: string;
  file: string;
  id: number;
  isLiked: boolean;
  isMine: boolean;
  likes: number;
  user: {
    username: string;
    avatar: string;
  };
}

interface IFeed {
  seeFeed: IPhoto[];
}

export default function Feed({ navigation }: any) {
  const { data, loading } = useQuery<IFeed>(FEED_QUERY);
  console.log(data);
  const renderPhoto = ({ item: photo }: { item: IPhoto }) => {
    return <NavPhoto {...photo} />;
  };
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      isLoggedInVar(false);
      tokenVar("");
    } catch (event) {
      console.log("Failed to log out(delete token from storage", event);
    }
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => photo.id + ""}
        renderItem={renderPhoto}
      ></FlatList>
      {/* <Text style={{ color: "white" }}>Loaded</Text> */}
    </ScreenLayout>
  );
}
