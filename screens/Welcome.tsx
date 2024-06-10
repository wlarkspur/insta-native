import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

//ReactNative에서는 기본적으로 flex-direction 이 column이다.

const LoginLink = styled.Text`
  color: ${colors.blue};
  display: flex;
  justify-content: center;
  align-self: center;
  font-weight: 600;
  margin-top: 20px;
`;

export default function Welcome({ navigation }: any) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("LogIn");
  return (
    <AuthLayout>
      <AuthButton
        text="Create Account"
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
