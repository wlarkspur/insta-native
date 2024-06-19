import { ReactNode } from "react";
import { View, Text, ActivityIndicator } from "react-native";

interface IScreenLayout {
  loading: boolean;
  children: ReactNode;
}

export default function ScreenLayout({ loading, children }: IScreenLayout) {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
