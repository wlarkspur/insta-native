import { View, Text } from "react-native";

export default function Profile() {
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
