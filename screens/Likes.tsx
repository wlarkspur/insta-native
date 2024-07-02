import { gql, useQuery } from "@apollo/client";
import { View, Text, FlatList } from "react-native";
import { USER_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import React, { useState } from "react";
import UserRow from "../components/UserRow";

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default function Likes({ route }: any) {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route?.params?.photoId,
  });

  const renderUser = ({ item: user }: any) => <UserRow {...user} />;
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 1,
              margin: 3,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          ></View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={renderUser}
        keyExtractor={(item) => item.id + ""}
        data={data?.seePhotoLikes}
        style={{ width: "100%" }}
      />
    </ScreenLayout>
  );
}
