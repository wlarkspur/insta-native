import { View, Text, TouchableOpacity } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedInVar, tokenVar } from "../apollo";
import { styled } from "styled-components/native";
const Container = styled.View`
  flex: 1;
`;

export default function Feed({ navigation }: any) {
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
    <Container>
      <AuthButton text="Log out" disabled={false} onPress={logout}></AuthButton>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
          <Text style={{ color: "white" }}>Photo</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
