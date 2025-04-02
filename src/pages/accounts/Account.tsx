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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/utils";
import { AccountBalanceHistoryChart } from "./AccountBalanceHistoryChart";

const Account = () => {
  const { accountId } = useParams();
  const { error, data, refetch, loading } = useQuery(GET_ACCOUNT, {
    variables: {
      id: accountId as string,
      first: INITIAL_PAGE_SIZE,
    },
    skip: !accountId,
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
      <Layout
        title=<Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>Account</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{data?.account?.name}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col gap-5">
              <div className="flex gap-3 items-center">
                <Avatar className="bg-white rounded-full">
                  <AvatarImage src="/images/chase.png" />
                  <AvatarFallback>GnB</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex w-full justify-between">
                    {loading && (
                      <Skeleton className="w-[100px] h-[20px] rounded-xl" />
                    )}
                    {!loading && data && data.account && (
                      <h1>{data.account.name}</h1>
                    )}
                    <CardDescription>
                      {loading && (
                        <Skeleton className="w-[150px] h-[15px] rounded-xl" />
                      )}
                      {!loading && data && data.account && (
                        <span className="font-medium">
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
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <CardDescription>
                    {loading && (
                      <Skeleton className="w-[50px] h-[20px] rounded-xl" />
                    )}
                    {!loading && data && data.account && data.account.type}
                  </CardDescription>
                </div>
              </div>
              <Separator />
              <div className="flex gap-5 items-center">
                <div className="flex flex-col gap-1">
                  <span>
                    {formatCurrency(data?.account?.balance ?? 0, true)}
                  </span>
                  <span className="font-normal text-muted-foreground text-sm">
                    Balance
                  </span>
                </div>
                <AccountBalanceHistoryChart
                  data={data?.account?.balanceHistory ?? []}
                />
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsTable
              className="h-[40vh]"
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
