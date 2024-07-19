import { NavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
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
};

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
