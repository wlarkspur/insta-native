import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";

const Stack = createNativeStackNavigator();

export default function MessagesNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
