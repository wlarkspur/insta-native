import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNav from "./TabsNav";
import { Ionicons } from "@expo/vector-icons";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function LoggedInNav() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerLeft: ({ tintColor }) => (
            <Ionicons
              color={tintColor}
              name="close"
              size={22}
              onPress={() => navigation.goBack()}
            />
          ),
          /* headerBackTitleVisible: true, */
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
}
