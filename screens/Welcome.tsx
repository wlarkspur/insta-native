import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native";

//ReactNative에서는 기본적으로 flex-direction 이 column이다.
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 114px;
`;

const CreateAccount = styled.View`
  background-color: ${colors.blue};
  padding: 5px 10px;
  border-radius: 5px;
`;

const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 10px;
`;

export default function Welcome({ navigation }: any) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("LogIn");
  return (
    <Container>
      <Logo
        resizeMode="contain"
        source={require("../assets/Instagram-blackwhite.png")}
      />
      <TouchableOpacity onPress={goToCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
