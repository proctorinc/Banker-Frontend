import Layout from "@/app/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_ACCOUNT } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  INITIAL_PAGE_SIZE,
  PaginationContextProvider,
} from "@/context/PaginationContext";
import {
  Account as AccountType,
  Transaction,
} from "@/graphql/__generated__/graphql";
import TransactionsTable from "@/features/auth/transactions/components/table/transaction-table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { formatCurrency, nameToColor } from "@/utils/utils";
import { AccountBalanceHistoryChart } from "./AccountBalanceHistoryChart";
import EditAccountModal from "./components/modals/EditAccountModal";
import { Label } from "@/components/ui/label";
import { AccountLogo } from "./AccountLogo";

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
        title={
          <Breadcrumb>
            <BreadcrumbList className="flex gap-0">
              <BreadcrumbItem>
                <BreadcrumbLink>Accounts</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {loading ? (
                  <Skeleton className="w-[100px] h-[16px] rounded-xl" />
                ) : (
                  <BreadcrumbLink>{data?.account?.name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex w-full items-center gap-3">
                    {!loading && data?.account && (
                      <AccountLogo
                        account={data.account as AccountType}
                        size="lg"
                      />
                    )}
                    {loading && (
                      <div className="flex gap-2 items-center">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="w-[125px] h-[16px] rounded-xl" />
                          <Skeleton className="w-[75px] h-[16px] rounded-xl" />
                        </div>
                      </div>
                    )}
                    {!loading && data?.account && (
                      <div className="flex flex-col gap-2 w-fit">
                        <h1>{data.account.name}</h1>
                        <Label className="text-muted-foreground">
                          {data.account.type}
                        </Label>
                      </div>
                    )}
                    {data?.account && (
                      <EditAccountModal account={data.account as AccountType} />
                    )}
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-5 items-center">
              <div className="flex flex-col gap-1 w-36">
                <h3 className="font-semibold">
                  {formatCurrency(data?.account?.balance ?? 0, true)}
                </h3>
                <span className="text-muted-foreground text-sm line-clamp-1">
                  Current balance
                </span>
              </div>
              <AccountBalanceHistoryChart
                color={nameToColor(data?.account?.name ?? "")}
                data={data?.account?.balanceHistory ?? []}
              />
            </div>
          </CardContent>
        </Card>
        <TransactionsTable
          className="h-[58vh]"
          data={transactions}
          totalRows={totalTransactions}
          fetchPage={fetchPage}
          loading={loading}
        />
      </Layout>
    </PaginationContextProvider>
  );
};

export default Account;
