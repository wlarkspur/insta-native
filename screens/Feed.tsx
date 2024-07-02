import { FlatList, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedInVar, tokenVar } from "../apollo";
import { styled } from "styled-components/native";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import NavPhoto from "../components/NavPhoto";
import { useState } from "react";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
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
    id: number;
    username: string;
    avatar: string;
  };
}

interface IFeed {
  seeFeed: IPhoto[];
}

export default function Feed({ navigation }: any) {
  const { data, loading, refetch, fetchMore } = useQuery<IFeed>(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });

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
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo, index) => `${photo.id}-${index}`}
        renderItem={renderPhoto}
      ></FlatList>
      {/* <Text style={{ color: "white" }}>Loaded</Text> */}
    </ScreenLayout>
  );
}
