import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;

  justify-content: center;
  background-color: black;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 61%;
  height: 114px;
  align-self: center;
`;

export default function AuthLayout({ children }: any) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <KeyboardAvoidingView
          style={{
            width: "100%",
          }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require("../../assets/Instagram-blackwhite.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
