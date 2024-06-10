import { ApolloClient, InMemoryCache } from "@apollo/client";

//http://localhost:4000/graphql

const client = new ApolloClient({
  uri: "https://31c4-194-50-12-144.ngrok-free.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
