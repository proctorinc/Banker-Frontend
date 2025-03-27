import { useContext } from "react";
import MergeMerchantsContext from "../context/MergeMerchantsContext";

export const useMergeMerchantsForm = () => {
  const mergeMerchantsFormContext = useContext(MergeMerchantsContext);

  if (!mergeMerchantsFormContext) {
    throw Error(
      "useMergeMerchantsForm has to be used within <MergeMerchantsFormContext.Provider>",
    );
  }

  return mergeMerchantsFormContext;
};
