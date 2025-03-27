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
import { Skeleton } from "@/components/ui/skeleton";

const Account = () => {
  const { accountId } = useParams();
  const { error, data, refetch, loading } = useQuery(GET_ACCOUNT, {
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

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <PaginationContextProvider>
      <Layout title="Account">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex w-full justify-between">
                {loading && (
                  <Skeleton className="w-[100px] h-[20px] rounded-xl" />
                )}
                {!loading && data && data.account && (
                  <h1>{data.account.name}</h1>
                )}
                <CardDescription>
                  {loading && (
                    <Skeleton className="w-[150px] h-[20px] rounded-xl" />
                  )}
                  {!loading && data && data.account && (
                    <>
                      last sync:{" "}
                      {new Date(data.account.lastSync.date).toLocaleString(
                        "en-US",
                        {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "America/Los_Angeles",
                        },
                      )}
                    </>
                  )}
                </CardDescription>
              </div>
            </CardTitle>
            <CardDescription>
              {loading && <Skeleton className="w-[50px] h-[20px] rounded-xl" />}
              {!loading && data && data.account && data.account.type}
            </CardDescription>
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
              loading={loading}
            />
          </CardContent>
        </Card>
      </Layout>
    </PaginationContextProvider>
  );
};

export default Account;
