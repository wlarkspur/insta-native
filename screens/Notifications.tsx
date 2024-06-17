import { View, Text } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedInVar, tokenVar } from "../apollo";

export default function Notifications() {
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
        <Text style={{ color: "white" }}>Notifications</Text>
      </View>
    </>
  );
}
