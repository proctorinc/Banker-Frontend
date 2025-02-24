import { useContext } from "react";
import SavingsPageContext from "../context/SavingsPageContext";

export const useSavingsPage = () => {
  const savingsPageContext = useContext(SavingsPageContext);

  if (!savingsPageContext) {
    throw Error(
      "useSavingsPage has to be used within <SavingsPageContext.Provider>",
    );
  }

  return savingsPageContext;
};
