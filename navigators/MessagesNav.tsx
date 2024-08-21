import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function MessagesNav() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Stack.Screen
        name="Rooms"
        options={{
          headerLeft: ({ tintColor }) => (
            <Ionicons
              name="chevron-down"
              size={30}
              color={tintColor}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
        component={Rooms}
      />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
