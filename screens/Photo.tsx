import { gql, useQuery } from "@apollo/client";
import { RefreshControl, ScrollView, View } from "react-native";
import { PHOTO_FRAGMENT } from "../fragments";
import NavPhoto from "../components/NavPhoto";
import ScreenLayout from "../components/ScreenLayout";
import React, { useState } from "react";

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;

export default function PhotoScreen({ route }: any) {
  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: {
      id: route?.params?.photoId,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "black" }}
        contentContainerStyle={{
          backgroundColor: "black",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*  <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={{ color: "white" }}>Profile</Text>
        </TouchableOpacity> */}
        <NavPhoto {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
}
