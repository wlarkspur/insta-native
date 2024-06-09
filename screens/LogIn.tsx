import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";

export default function LogIn({ navigation }: any) {
  return (
    <AuthLayout>
      <AuthTextInput
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.6)"
        returnKeyType="done"
      />
      <AuthTextInput
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.6)"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
      />
    </AuthLayout>
  );
}
