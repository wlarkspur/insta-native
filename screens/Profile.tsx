import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import ProfileProps from "../interface";

export default function Profile({ navigation, route }: ProfileProps) {
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route?.params.username,
      });
    }
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
        <Text style={{ color: "white" }}>Someone's Profile</Text>
      </View>
    </>
  );
}
