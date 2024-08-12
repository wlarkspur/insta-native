import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { ROOM_FRAGMENT } from "../fragments";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";

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

const RoomContainer = styled.View`
  background-color: black;
`;
const RoomText = styled.Text`
  color: white;
`;

export default function Rooms() {
  const { data, loading } = useQuery<ISeeRooms>(SEE_ROOMS_QUERY);
  const renderItem = ({ item: room }: any) => (
    <RoomContainer>
      <RoomText>
        {room.unreadTotal === "0"
          ? "Name of the other person"
          : `${room.unreadTotal} messages.`}
      </RoomText>
    </RoomContainer>
  );
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeRooms}
        keyExtractor={(room) => room.id + ""}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
