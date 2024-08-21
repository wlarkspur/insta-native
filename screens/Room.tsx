import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import useMe from "../hooks/useMe";
import { tokenVar } from "../apollo";

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View<{ Incoming: boolean }>`
  padding: 5px 10px;
  flex-direction: ${(props) => (props.Incoming ? "row" : "row-reverse")};
  align-items: flex-end;
`;
const Author = styled.View`
  margin-right: 10px;
`;
const Avatar = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 25px;
`;

const MessageBubble = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
`;

const MessageText = styled.Text`
  color: white;
  font-size: 16px;
  margin: 0 10px;
`;

const TextInput = styled.TextInput`
  margin-top: 20px;
  margin-bottom: 50px;
  width: 95%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  color: white;
  border-radius: 100%;
`;

export default function Room({ route, navigation }: any) {
  const { data: meData } = useMe();

  const { register, setValue, handleSubmit, getValues, watch } = useForm();
  const updateSendMessage = (cache: any, result: any) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    console.log(result);

    if (ok && meData) {
      const { message } = getValues();
      setValue("message", "");

      const messageObj = {
        id,
        payload: message,
        user: {
          username: meData?.me.username,
          avatar: meData?.me.avatar,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev: any) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );

  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  const onValid = ({ message }: any) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      }).catch((error) => {
        console.log("Error sending message", error);
      });
    }
  };
  useEffect(() => {
    register("message", { required: true });
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
    });
  }, []);

  const renderItem = ({ item: message }: any) => (
    <MessageContainer
      Incoming={message.user.username !== route?.params?.talkingTo?.username}
    >
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
      </Author>
      <MessageBubble>
        <MessageText>{message.payload}</MessageText>
      </MessageBubble>
    </MessageContainer>
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="height"
      keyboardVerticalOffset={70}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          style={{
            width: "100%",
            paddingVertical: 1,
            marginBottom: 5,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => message.id + ""}
          renderItem={renderItem}
        />
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.5)"
          placeholder="Write a message..."
          returnKeyLabel="Send Message"
          returnKeyType="send"
          onChangeText={(text) => setValue("message", text)}
          onSubmitEditing={handleSubmit(onValid)}
          value={watch("message")}
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
