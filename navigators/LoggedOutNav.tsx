import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import CreateAccount from "../screens/CreateAccount";

import { NavigationContainer } from "@react-navigation/native";
import LogIn from "../screens/LogIn";

const Stack = createNativeStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
        }}
        component={Welcome}
      />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
