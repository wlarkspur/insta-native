import React from "react";
import styled from "styled-components/native";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "react-native";

export default function CreateAccount() {
  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="gray"
        returnKeyType="done"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="gray"
        returnKeyType="done"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor="gray"
        returnKeyType="done"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        returnKeyType="done"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <AuthButton text="Create Account" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}
