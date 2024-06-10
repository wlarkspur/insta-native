import { useState, useEffect } from "react";
import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { useAssets } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { Appearance } from "react-native";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [assets, error] = useAssets([
    require(`./assets/Instagram-name-logo-transparent-PNG.png`),
    "https://image.similarpng.com/very-thumbnail/2020/06/Instagram-name-logo-transparent-PNG.png",
  ]);
  useEffect(() => {
    async function prepare() {
      try {
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
  const light = Appearance.getColorScheme();
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    console.log(colorScheme);
  });
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <LoggedOutNav />
      </NavigationContainer>
    </ApolloProvider>
  );
}
