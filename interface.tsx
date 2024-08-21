import { NavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Tabs: undefined;
  Upload: undefined;
  UploadForm: { file: string };
  Messages: undefined;
  TabFeed: undefined;
  TabSearch: undefined;
  Feed: undefined;
  Search: undefined;
  TabNotifications: undefined;
  TabMe: undefined;
  Profile: {
    id: number;
    username: string;
    avatar?: string;
  };
  Photo: { photoId: number } | undefined;
  Likes: undefined;
  Comments: undefined;
  Room:
    | {
        id: string;
        talkingTo: { id: string; username: string; avatar: string };
      }
    | undefined;
};
export type RoomScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Room"
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;
type ProfileScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "Profile"
>;
type MeSreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TabMe"
>;
type SearchNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Search"
>;

export interface SelectPhotoProps {
  navigation: NavigationProp<any>;
}

export interface SearchProps {
  navigation: SearchNavigationProp;
}

export default interface ProfileProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

export interface MeProps {
  navigation: MeSreenNavigationProp;
}
