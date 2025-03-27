import useActiveMonths from "@/features/activeMonths/hooks/useActiveMonths";
import { Merchant } from "@/graphql/__generated__/graphql";
import { GET_MERCHANTS } from "@/graphql/queries/getMerchants";
import usePaginate from "@/hooks/usePaginate";
import { ApolloError, useQuery } from "@apollo/client";
import { createContext, FC, ReactNode, useEffect } from "react";
import { toast } from "sonner";

type MerchantsPageContextProviderProps = {
  children: ReactNode;
};

type MerchantsPagination = {
  getNextPage: () => void;
  totalMerchants: number;
  hasMore: boolean;
};

type MerchantsPageContext = {
  data: Merchant[];
  isLoading: boolean;
  error: ApolloError | undefined;
  merchantsPagination: MerchantsPagination;
};

const MerchantsPageContext = createContext<MerchantsPageContext | null>(null);

export const MerchantsPageContextProvider: FC<
  MerchantsPageContextProviderProps
> = ({ children }) => {
  const { pageSize, cursor, getNextPage } = usePaginate();
  const { selectedMonth } = useActiveMonths();
  const { loading, error, data, fetchMore } = useQuery(GET_MERCHANTS);

  // Pagination data for savings funds
  const merchantsPagination = {
    getNextPage,
    totalMerchants: data?.merchants.pageInfo.totalCount ?? 0,
    hasMore: data?.merchants.pageInfo.hasNextPage ?? false,
  };

  const merchants = data
    ? data.merchants.edges.map(({ node }) => node as Merchant)
    : [];

  useEffect(() => {
    fetchMore({
      variables: {
        startDate: selectedMonth?.start,
        endDate: selectedMonth?.end,
        first: pageSize,
        after: cursor,
      },
    });
  }, [selectedMonth, fetchMore, pageSize, cursor]);

  if (error) {
    toast.error("Uh oh, an error occurred", {
      description: error.message,
      closeButton: true,
    });
  }

  const contextData = {
    data: merchants,
    isLoading: loading,
    error,
    merchantsPagination,
  };

  return (
    <MerchantsPageContext.Provider value={contextData}>
      {children}
    </MerchantsPageContext.Provider>
  );
};

export default MerchantsPageContext;
