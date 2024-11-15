import Layout from "@/app/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fund } from "@/graphql/__generated__/graphql";
import { GET_SAVINGS_FUNDS } from "@/graphql/queries";
import { formatCurrency } from "@/utils/utils";
import { useQuery } from "@apollo/client";
import SavingsChart from "./SavingsChart";
import { Button } from "@/components/ui/button";
import usePaginate from "@/hooks/usePaginate";
import { useEffect } from "react";
import CreateSavingsFundModal from "./CreateSavingsFundModal";

const Savings = () => {
  const { pageSize, cursor, getNextPage } = usePaginate();
  const { loading, error, data, fetchMore } = useQuery(GET_SAVINGS_FUNDS, {
    variables: {
      first: pageSize,
    },
  });

  const funds = data
    ? data.savingsFunds.edges.map(({ node }) => node as Fund)
    : [];

  const totalFunds = data?.savingsFunds.pageInfo.totalCount ?? 0;

  const hasMore = data?.savingsFunds.pageInfo.hasNextPage;

  useEffect(() => {
    fetchMore({
      variables: {
        first: pageSize,
        after: cursor,
      },
    });
  }, [fetchMore, pageSize, cursor]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout title="Savings">
      <Card>
        <CardHeader>
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Savings Funds</CardTitle>
              <CardDescription>Total Funds: {totalFunds}</CardDescription>
            </div>
            <CreateSavingsFundModal />
          </div>
        </CardHeader>
        <CardContent>
          <SavingsChart />
        </CardContent>
      </Card>
      <h1 className="font-semibold">Funds:</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {funds.map((fund) => (
          <Card key={fund.id}>
            <CardHeader>
              <CardTitle>{fund.name}</CardTitle>
              <CardDescription>
                Balance: {formatCurrency(fund.total)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!!fund.goal && (
                <p>
                  {fund.total} out of {fund.goal}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={() => getNextPage()}>
            Load More
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default Savings;
