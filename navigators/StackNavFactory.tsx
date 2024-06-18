import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import Photo from "../screens/Photo";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";

const Stack = createNativeStackNavigator();
export default function StackNavFactory({ screenName }: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen name="Feed" component={Feed} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}
