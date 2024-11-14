import Layout from "@/app/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GET_ACCOUNT } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  INITIAL_PAGE_SIZE,
  PaginationContextProvider,
} from "@/context/PaginationContext";
import { Transaction } from "@/graphql/__generated__/graphql";
import TransactionsTable from "@/features/auth/transactions/components/table/transaction-table";

const Account = () => {
  const { accountId } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_ACCOUNT, {
    variables: {
      id: accountId as string,
      first: INITIAL_PAGE_SIZE,
    },
    skip: accountId === undefined,
  });

  const transactions =
    data?.account?.transactions.edges.map(({ node }) => node as Transaction) ??
    [];

  const totalTransactions =
    data?.account?.transactions.pageInfo.totalCount ?? 0;

  function fetchPage(pageSize: number, cursor: string | null) {
    refetch({
      id: accountId as string,
      first: pageSize,
      after: cursor,
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!!data && !!data.account) {
    return (
      <PaginationContextProvider>
        <Layout title="Account">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>{data.account.name}</CardTitle>
                <CardDescription>{data.account.type}</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionsTable
                  data={transactions}
                  totalRows={totalTransactions}
                  fetchPage={fetchPage}
                />
              </CardContent>
            </Card>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </Layout>
      </PaginationContextProvider>
    );
  } else {
    <div>Failed to load account</div>;
  }
};

export default Account;
