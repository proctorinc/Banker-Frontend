import { ApolloProvider } from "@apollo/client";
import { FC, ReactNode } from "react";
import { client } from "../lib/apollo-client";
import { AuthContextProvider } from "@/features/auth/context/AuthContext";
import { BrowserRouter } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const GraphQLProvider: FC<Props> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthContextProvider>{children}</AuthContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
};
