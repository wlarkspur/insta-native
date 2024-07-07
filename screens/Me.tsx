import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useMe from "../hooks/useMe";
import { MeProps } from "../interface";

export default function Me({ navigation }: MeProps) {
  const { data } = useMe();

  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);

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
      </View>
    </>
  );
}
