import { PaginationContextProvider } from "@/context/PaginationContext";
import { SavingsPageContextProvider } from "./context/SavingsPageContext";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const SavingsPageProviders: FC<Props> = ({ children }) => {
  return (
    <PaginationContextProvider>
      <SavingsPageContextProvider>{children}</SavingsPageContextProvider>
    </PaginationContextProvider>
  );
};
