import { View, Text } from "react-native";

export default function Comments() {
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
        <Text style={{ color: "white" }}>Comments</Text>
      </View>
    </>
  );
}
