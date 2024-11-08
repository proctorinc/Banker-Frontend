import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import Config from "../config";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (Config.__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

const apolloClientCache = new InMemoryCache();

const link = createHttpLink({
  uri: Config.SERVER_URL,
  credentials: "include",
});

const apolloClientConfig = {
  uri: Config.SERVER_URL,
  cache: apolloClientCache,
  link,
};

export const client = new ApolloClient(apolloClientConfig);
