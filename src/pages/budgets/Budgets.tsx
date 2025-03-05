import Layout from "@/app/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Fund } from "@/graphql/__generated__/graphql";
import { formatCurrency } from "@/utils/utils";
import { useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import usePaginate from "@/hooks/usePaginate";
import { useEffect } from "react";
import { PiggyBank } from "lucide-react";
import { GET_BUDGETS } from "@/graphql/queries";
import CreateBudgetModal from "./CreateBudgetModal";
import BudgetChart from "./BudgetChart";
import { Progress } from "@/components/ui/progress";

const Budgets = () => {
  const { pageSize, cursor, getNextPage } = usePaginate();
  const { error, data, fetchMore } = useQuery(GET_BUDGETS, {
    variables: {
      first: pageSize,
    },
  });

  const budgets = data
    ? data.budgets.edges.map(({ node }) => node as Fund)
    : [];

  const totalBudgets = data?.budgets.pageInfo.totalCount ?? 0;

  const hasMore = data?.budgets.pageInfo.hasNextPage;

  useEffect(() => {
    fetchMore({
      variables: {
        first: pageSize,
        after: cursor,
      },
    });
  }, [fetchMore, pageSize, cursor]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout title="Savings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-0">
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-2">
                <CardTitle>November Budget</CardTitle>
                <CardDescription>Total Funds: {totalBudgets}</CardDescription>
              </div>
              <CreateBudgetModal />
            </div>
          </CardHeader>
          <BudgetChart />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budgets</CardTitle>
            <CardDescription>Monthly budgets for November</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {budgets.map((budget) => (
              <div key={budget.id} className="flex flex-col">
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center">
                    <PiggyBank />
                    {budget.name}
                  </div>
                </div>
                <div>
                  {formatCurrency(budget.total)}
                  {budget.goal !== 0 && (
                    <span> / {formatCurrency(budget.goal)}</span>
                  )}
                </div>
                <Progress value={33} />
              </div>
            ))}
          </CardContent>
        </Card>
        {hasMore && (
          <div className="flex justify-center">
            <Button variant="ghost" onClick={() => getNextPage()}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Budgets;
