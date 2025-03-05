import Layout from "@/app/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_TRANSACTIONS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import {
  INITIAL_PAGE_SIZE,
  PaginationContextProvider,
} from "@/context/PaginationContext";
import TransactionsTable from "@/features/auth/transactions/components/table/transaction-table";
import { Transaction } from "@/graphql/__generated__/graphql";

const Transactions = () => {
  const { error, data, refetch } = useQuery(GET_TRANSACTIONS, {
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
        <div className="flex flex-1 flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionsTable
                data={transactions}
                totalRows={totalTransactions}
                fetchPage={fetchPage}
              />
            </CardContent>
          </Card>
        </div>
      </Layout>
    </PaginationContextProvider>
  );
};

export default Transactions;
