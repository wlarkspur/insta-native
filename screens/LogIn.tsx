import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function LogIn({ navigation }: any) {
  return (
    <View>
      <Text>LogIn</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text>Go to Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
