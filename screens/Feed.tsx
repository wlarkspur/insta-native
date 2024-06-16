import { View, Text } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedInVar, tokenVar } from "../apollo";

export default function Feed() {
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
      <AuthButton text="Log out" disabled={false} onPress={logout}></AuthButton>
      <View>
        <Text></Text>
      </View>
    </>
  );
}
