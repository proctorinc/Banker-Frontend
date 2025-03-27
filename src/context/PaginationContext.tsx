import { PaginationState } from "@tanstack/react-table";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const PAGE_SIZES = [10, 25, 50];
export const INITIAL_PAGE_SIZE = PAGE_SIZES[2];

const INITIAL_STATE = {
  pageIndex: 0,
  pageSize: INITIAL_PAGE_SIZE,
};

type Props = {
  children: ReactNode;
};

type PaginationContext = {
  pageIndex: number;
  pageSize: number;
  cursor: string | null;
  setPaginationState: Dispatch<SetStateAction<PaginationState>>;
  setCursor: (newCursor: string | null) => void;
  setCursorForPage: (page: number) => void;
  getNextPage: () => void;
  getPreviousPage: () => void;
  getFirstPage: () => void;
  getLastPage: (rowCount: number) => void;
};

const PaginationContext = createContext<PaginationContext | null>(null);

export const PaginationContextProvider: FC<Props> = ({ children }) => {
  const [paginationState, setPaginationState] =
    useState<PaginationState>(INITIAL_STATE);
  const [cursor, setCursor] = useState<string | null>(null);

  function setCursorForPage(page: number) {
    setCursor(btoa(`cursor:offset:${page}`));
  }

  function getNextPage() {
    setCursorForPage(paginationState.pageIndex + 1);
  }

  function getPreviousPage() {
    setCursorForPage(paginationState.pageIndex - 1);
  }

  function getFirstPage() {
    setCursorForPage(0);
  }

  function getLastPage(rowCount: number) {
    setCursorForPage(Math.ceil(rowCount / paginationState.pageSize));
  }

  const contextData: PaginationContext = {
    ...paginationState,
    cursor,
    setPaginationState,
    setCursor,
    setCursorForPage,
    getNextPage,
    getPreviousPage,
    getFirstPage,
    getLastPage,
  };

  return (
    <PaginationContext.Provider value={contextData}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationContext;
