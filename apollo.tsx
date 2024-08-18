import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token: any) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar("null");
};

// Custom isExtractableFile function
interface ExtractableFile {
  uri: string;
  name: string;
  type: string;
}

// Define the type guard function
function isExtractableFile(value: any): value is ExtractableFile {
  return (
    value &&
    typeof value.uri === "string" &&
    typeof value.name === "string" &&
    typeof value.type === "string"
  );
}

const uploadHttpLink = createUploadLink({
  uri: "https://8e7e-91-132-92-31.ngrok-free.app/graphql",
  isExtractableFile, //ReactNativeFile 사용되지 않아 추가 검증 코드가 필요로 하게 되었을 가능성이 큼.
  /* headers: {
    "Apollo-require-preflight": "true",
  }, */
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

//http://localhost:4000/graphql

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQl Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
});

export default client;
