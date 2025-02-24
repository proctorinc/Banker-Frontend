import useActiveMonths from "@/features/activeMonths/hooks/useActiveMonths";
import { FundsResponse } from "@/graphql/__generated__/graphql";
import { GET_SAVINGS_PAGE_DATA } from "@/graphql/queries";
import usePaginate from "@/hooks/usePaginate";
import { ApolloError, useQuery } from "@apollo/client";
import { createContext, FC, ReactNode, useEffect } from "react";

type SavingsPageContextProviderProps = {
  children: ReactNode;
};

type FundsPagination = {
  getNextPage: () => void;
  totalFunds: number;
  hasMore: boolean;
};

type SavingsPageContext = {
  data: FundsResponse;
  isLoading: boolean;
  error: ApolloError | undefined;
  fundsPagination: FundsPagination;
};

const SavingsPageContext = createContext<SavingsPageContext | null>(null);

export const SavingsPageContextProvider: FC<
  SavingsPageContextProviderProps
> = ({ children }) => {
  const { pageSize, cursor, getNextPage } = usePaginate();
  const { currentMonth } = useActiveMonths();
  const { loading, error, data, fetchMore } = useQuery(GET_SAVINGS_PAGE_DATA, {
    variables: {
      startDate: currentMonth?.start,
      endDate: currentMonth?.end,
      first: pageSize,
    },
  });

  // Pagination data for savings funds
  const fundsPagination = {
    getNextPage,
    totalFunds: data?.savingsFunds.funds.pageInfo.totalCount ?? 0,
    hasMore: data?.savingsFunds.funds.pageInfo.hasNextPage ?? false,
  };

  useEffect(() => {
    fetchMore({
      variables: {
        startDate: currentMonth?.start,
        endDate: currentMonth?.end,
        first: pageSize,
        after: cursor,
      },
    });
  }, [currentMonth?.start, currentMonth?.end, fetchMore, pageSize, cursor]);

  const contextData = {
    data: data?.savingsFunds as FundsResponse,
    isLoading: loading,
    error,
    fundsPagination,
  };

  return (
    <SavingsPageContext.Provider value={contextData}>
      {children}
    </SavingsPageContext.Provider>
  );
};

export default SavingsPageContext;
