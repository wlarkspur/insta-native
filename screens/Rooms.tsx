import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, View } from "react-native";
import { ROOM_FRAGMENT } from "../fragments";

import ScreenLayout from "../components/ScreenLayout";

import RoomItem from "../components/rooms/RoomItem";

interface IUser {
  avatar: string;
  username: string;
}

interface IRoom {
  id: number;
  unreadTotal: number;
  users: IUser[];
}

interface ISeeRooms {
  seeRooms: IRoom[];
}

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

export default function Rooms() {
  const { data, loading } = useQuery<ISeeRooms>(SEE_ROOMS_QUERY);
  const renderItem = ({ item: room }: any) => <RoomItem {...room} />;
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
        data={data?.seeRooms}
        keyExtractor={(room) => room.id + ""}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
