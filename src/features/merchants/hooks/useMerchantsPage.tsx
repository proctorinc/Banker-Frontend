import { useContext } from "react";
import MerchantsPageContext from "../context/MerchantsPageContext";

export const useMerchantsPage = () => {
  const merchantsPageContext = useContext(MerchantsPageContext);

  if (!merchantsPageContext) {
    throw Error(
      "useMerchantsPage has to be used within <MerchantsPageContext.Provider>",
    );
  }

  return merchantsPageContext;
};
