import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function UploadNav() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white", top: 0 },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerTintColor: "white",
              headerBackTitleVisible: true,
              headerStyle: {
                backgroundColor: "black",
              },
              headerLeft: ({ tintColor }) => (
                <Ionicons
                  color={tintColor}
                  name="close"
                  size={22}
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          >
            <Stack.Screen
              name="SelectPhoto"
              component={SelectPhoto}
              options={{ title: "Choose a photo" }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
}
