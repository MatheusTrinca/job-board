import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { getAccessToken } from '../auth';

const httpLink = createHttpLink({
  uri: 'http://localhost:9000/graphql',
});

const customLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
    },
  }));
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(customLink, httpLink),
  cache: new InMemoryCache(),
});
