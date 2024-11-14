import { useContext } from "react";
import PaginationContext from "@/context/PaginationContext";

const usePaginate = () => {
  const paginationContext = useContext(PaginationContext);

  if (!paginationContext) {
    throw new Error(
      "usePaginate has to be used within <PaginationContext.Provider>",
    );
  }

  return paginationContext;
};

export default usePaginate;
