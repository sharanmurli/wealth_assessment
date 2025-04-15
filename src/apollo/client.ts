import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API, // e.g., http://localhost:4000/graphql
  cache: new InMemoryCache(),
});

export default client;
