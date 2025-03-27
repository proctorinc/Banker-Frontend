import { PaginationContextProvider } from "@/context/PaginationContext";
import { MerchantsPageContextProvider } from "./context/MerchantsPageContext";
import { FC, ReactNode } from "react";
import { MergeMerchantsContextProvider } from "./context/MergeMerchantsContext";

type Props = {
  children: ReactNode;
};

export const MerchantsPageProviders: FC<Props> = ({ children }) => {
  return (
    <PaginationContextProvider>
      <MerchantsPageContextProvider>
        <MergeMerchantsContextProvider>
          {children}
        </MergeMerchantsContextProvider>
      </MerchantsPageContextProvider>
    </PaginationContextProvider>
  );
};
