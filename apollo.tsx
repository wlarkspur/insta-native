import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

//http://localhost:4000/graphql

const client = new ApolloClient({
  uri: "https://b854-194-50-15-13.ngrok-free.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
