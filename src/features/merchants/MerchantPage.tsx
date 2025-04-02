import Layout from "@/app/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  INITIAL_PAGE_SIZE,
  PaginationContextProvider,
} from "@/context/PaginationContext";
import { Transaction } from "@/graphql/__generated__/graphql";
import TransactionsTable from "@/features/auth/transactions/components/table/transaction-table";
import { Skeleton } from "@/components/ui/skeleton";
import { GET_MERCHANT } from "@/graphql/queries/getMerchant";
import { Label } from "@/components/ui/label";
import { ArrowLeft, StepBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditMerchantsButton from "./modal/EditMerchantModalButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nameToColor } from "@/utils/utils";

const MerchantPage = () => {
  const { merchantId } = useParams();
  const { error, data, refetch, loading } = useQuery(GET_MERCHANT, {
    variables: {
      id: merchantId as string,
      first: INITIAL_PAGE_SIZE,
    },
    skip: !merchantId,
  });

  const transactions =
    data?.merchant?.transactions.edges.map(({ node }) => node as Transaction) ??
    [];

  const totalTransactions =
    data?.merchant?.transactions.pageInfo.totalCount ?? 0;

  function fetchPage(pageSize: number, cursor: string | null) {
    refetch({
      id: merchantId as string,
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
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/merchants">Merchants</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {loading && (
                  <Skeleton className="w-[125px] h-[20px] rounded-xl" />
                )}
                {!loading && data?.merchant?.name}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-3 items-center">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex w-full items-center gap-3">
                  {!loading && data?.merchant && (
                    <Avatar className="w-12 h-12 bg-white rounded-full">
                      <AvatarImage
                        src={`https://www.${data.merchant.name.replace(" ", "")}.com/favicon.ico`}
                      />
                      <AvatarFallback
                        className="text-xs font-medium"
                        style={{
                          backgroundColor: nameToColor(data.merchant.name),
                        }}
                      >
                        {data.merchant.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {loading && (
                    <div className="space-y-2">
                      <Skeleton className="w-[75px] h-[16px] rounded-xl" />
                      <Skeleton className="w-[125px] h-[16px] rounded-xl" />
                    </div>
                  )}
                  {!loading && data?.merchant && (
                    <div className="space-y-2">
                      <Label className="text-muted-foreground">Merchant:</Label>
                      <h1>{data.merchant.name}</h1>
                    </div>
                  )}
                  <EditMerchantsButton merchantId={merchantId} />
                </div>
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
              className="h-[50vh]"
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

export default MerchantPage;
