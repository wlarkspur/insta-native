import { View, Text, TouchableOpacity } from "react-native";

export default function Photo({ navigation }: any) {
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
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={{ color: "white" }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
