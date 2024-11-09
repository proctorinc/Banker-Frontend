import { ReactNode, FC } from "react";
import { GraphQLProvider } from "@/graphql/provider.tsx";

type Props = {
  children: ReactNode;
};

const AppProviders: FC<Props> = ({ children }) => {
  return <GraphQLProvider>{children}</GraphQLProvider>;
};

export default AppProviders;
