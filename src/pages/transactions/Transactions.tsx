import Layout from "@/app/layout";

import { GET_TRANSACTIONS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import {
  INITIAL_PAGE_SIZE,
  PaginationContextProvider,
} from "@/context/PaginationContext";
import TransactionsTable from "@/features/auth/transactions/components/table/transaction-table";
import { Transaction } from "@/graphql/__generated__/graphql";

const Transactions = () => {
  const { error, data, refetch, loading } = useQuery(GET_TRANSACTIONS, {
    variables: {
      first: INITIAL_PAGE_SIZE,
    },
  });

  const transactions = data
    ? data.transactions.edges.map(({ node }) => node as Transaction)
    : [];

  const totalTransactions = data?.transactions.pageInfo.totalCount ?? 0;

  function fetchPage(pageSize: number, cursor: string | null) {
    refetch({
      first: pageSize,
      after: cursor,
    });
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <PaginationContextProvider>
      <Layout title="Transactions">
        <TransactionsTable
          className="max-h-[78vh]"
          data={transactions}
          totalRows={totalTransactions}
          fetchPage={fetchPage}
          loading={loading}
        />
      </Layout>
    </PaginationContextProvider>
  );
};

export default Transactions;
