import { useState, useEffect } from "react";
import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { useAssets } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { cache, isLoggedInVar, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const preload = async () => {
    const token: any = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    });
  };
  const [assets, error] = useAssets([
    require(`./assets/Instagram-name-logo-transparent-PNG.png`),
    "https://image.similarpng.com/very-thumbnail/2020/06/Instagram-name-logo-transparent-PNG.png",
  ]);
  useEffect(() => {
    async function prepare() {
      try {
        await preload();
        // Pre-load assets, make any API calls you need to do here
        if (assets) {
          // Only proceed when assets are loaded
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false); // Set loading to false when assets are ready
      }
    }
    prepare();
  }, [assets]);

  if (loading || !assets) {
    return null; // Show nothing while loading
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
