import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import Photo from "../screens/Photo";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import { Image } from "react-native";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";
import { RootStackParamList } from "../interface";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function SharedStackNav({
  screenName,
}: {
  screenName: keyof RootStackParamList;
}) {
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
        <Stack.Screen
          name="TabFeed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  maxHeight: 40,
                  width: 100,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "TabSearch" ? (
        <Stack.Screen name="TabSearch" component={Search} />
      ) : null}
      {screenName === "TabNotifications" ? (
        <Stack.Screen name="TabNotifications" component={Notifications} />
      ) : null}
      {screenName === "TabMe" ? (
        <Stack.Screen name="TabMe" component={Me} />
      ) : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
