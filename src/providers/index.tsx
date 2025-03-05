import { ReactNode, FC } from "react";
import { GraphQLProvider } from "@/graphql/provider.tsx";
import { ActiveMonthsContextProvider } from "@/features/activeMonths/context/ActiveMonthContext";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: ReactNode;
};

const AppProviders: FC<Props> = ({ children }) => {
  return (
    <GraphQLProvider>
      <ActiveMonthsContextProvider>
        {children}
        <Toaster richColors />
      </ActiveMonthsContextProvider>
    </GraphQLProvider>
  );
};

export default AppProviders;
