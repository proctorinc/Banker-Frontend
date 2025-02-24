import { useContext } from "react";
import ActiveMonthsContext from "../context/ActiveMonthContext";

const useActiveMonths = () => {
  const activeMonthsContext = useContext(ActiveMonthsContext);

  if (!activeMonthsContext) {
    throw new Error(
      "useActiveMonths has to be used within <ActiveMonthsContext.Provider>",
    );
  }

  return activeMonthsContext;
};

export default useActiveMonths;
