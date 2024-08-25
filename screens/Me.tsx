import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useMe from "../hooks/useMe";
import { MeProps } from "../interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedInVar, tokenVar } from "../apollo";
import styled from "styled-components/native";

const LogoutBtn = styled.Button``;

export default function Me({ navigation }: MeProps) {
  const { data } = useMe();

  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
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
    <>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Me</Text>
        <LogoutBtn title="Log out" onPress={logout} />
      </View>
    </>
  );
}
