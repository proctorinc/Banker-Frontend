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
  const { error, data, refetch } = useQuery(GET_ACCOUNT, {
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

  if (!!data && !!data.account) {
    return (
      <PaginationContextProvider>
        <Layout title="Account">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex w-full justify-between">
                  <h1>{data.account.name}</h1>
                  <p className="font-light text-xs">
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
                  </p>
                </div>
              </CardTitle>
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
        </Layout>
      </PaginationContextProvider>
    );
  } else {
    <div>Failed to load account</div>;
  }
};

export default Account;
