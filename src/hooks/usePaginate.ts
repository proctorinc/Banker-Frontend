import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export const PAGE_SIZES = [10, 25, 50];
const INITIAL_STATE = {
  pageIndex: 0,
  pageSize: 10,
};

const usePaginate = () => {
  const [paginationState, setPaginationState] =
    useState<PaginationState>(INITIAL_STATE);

  return {
    ...paginationState,
    setPaginationState,
  };
};

export default usePaginate;
