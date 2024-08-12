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

        headerLeft: ({ tintColor }) => (
          <Ionicons
            name="close"
            size={24}
            color={tintColor}
            onPress={() => navigation.goBack()}
          />
        ),
      }}
    >
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
