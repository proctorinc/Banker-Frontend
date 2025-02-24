import { ApolloClient, InMemoryCache } from "@apollo/client";
import Config from "../config";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { relayStylePagination } from "@apollo/client/utilities";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

if (Config.__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

const apolloClientCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        transactions: relayStylePagination(),
        savingsFunds: relayStylePagination(),
      },
    },
  },
});

const link = createUploadLink({
  uri: Config.SERVER_URL,
  credentials: "include",
});

const apolloClientConfig = {
  uri: Config.SERVER_URL,
  cache: apolloClientCache,
  link,
};

export const client = new ApolloClient(apolloClientConfig);
