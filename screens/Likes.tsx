import { View, Text } from "react-native";

export default function Likes() {
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
        <Text style={{ color: "white" }}>Likes</Text>
      </View>
    </>
  );
}
