import React from "react";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";
import { colors } from "../../colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const RoomContainer = styled.TouchableOpacity`
  background-color: black;
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;
const Data = styled.View``;
const UnreadDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  color: white;
  margin-top: 2px;
  font-weight: 400;
`;

interface IMeData {
  id: string;
  username: string;
  avatar: string;
}

interface IUser {
  id: string;
  username: string;
  avatar: string;
}

interface IRoomItemProps {
  users: IUser[];
  unreadTotal: number;
  id: string;
}
type RootStackParamList = {
  Room: {
    id: string;
    talkingTo: IMeData | undefined;
  };
};

type RoomScreenNavigationProp = StackNavigationProp<RootStackParamList, "Room">;

export default function RoomItem({ users, unreadTotal, id }: IRoomItemProps) {
  const { data: meData } = useMe() as { data: IMeData };
  const navigation = useNavigation<RoomScreenNavigationProp>();
  const talkingTo: IMeData | undefined = users.find(
    (user: IUser) => user?.username !== meData?.username
  );
  const goToRoom = () =>
    navigation.navigate("Room", {
      id,
      talkingTo,
    });
  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: talkingTo?.avatar }} />
        <Data>
          <Username>{talkingTo?.username}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
}
