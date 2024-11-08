import { ApolloProvider } from "@apollo/client";
import { FC, ReactNode } from "react";
import { client } from "../lib/apollo-client";

type Props = {
  children: ReactNode;
};

export const GraphQLProvider: FC<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
