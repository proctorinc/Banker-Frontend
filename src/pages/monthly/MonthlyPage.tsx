import Layout from "@/app/layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ActiveMonthSelector from "@/features/activeMonths/components/ActiveMonthSelector";
import useActiveMonths from "@/features/activeMonths/hooks/useActiveMonths";
import { GET_STATS } from "@/graphql/queries";
import { formatCurrency } from "@/utils/utils";
import { useQuery } from "@apollo/client";
import { MoveRight, TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis } from "recharts";
import TransactionsTable from "@/features/auth/transactions/components/table/transaction-table";
import { Transaction } from "@/graphql/__generated__/graphql";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MonthlyFlow } from "@/features/monthly";

const chartConfig = {
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig;

const MonthlyPage = () => {
  const { selectedMonth } = useActiveMonths();
  const { error, data } = useQuery(GET_STATS, {
    variables: {
      startDate: selectedMonth?.start,
      endDate: selectedMonth?.end,
    },
    skip: !selectedMonth,
  });

  const chartData = [
    {
      type: "Income",
      total: data?.income.total ?? 0,
      fill: "hsl(var(--chart-2))",
    },
    {
      type: "Spending",
      total: Math.abs(data?.spending.total ?? 0),
      fill: "hsl(var(--chart-1))",
    },
  ];

  const incomeTransactions =
    data?.income?.transactions.edges.map(({ node }) => node as Transaction) ??
    [];

  const spendingTransactions =
    data?.spending?.transactions.edges.map(({ node }) => node as Transaction) ??
    [];

  const totalIncomeTransactions =
    data?.income?.transactions.pageInfo.totalCount ?? 0;
  const totalSpendingTransactions =
    data?.spending?.transactions.pageInfo.totalCount ?? 0;

  const netSavings = data ? data?.savingsFunds.stats.net : 0;

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout title="Monthly">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl">{selectedMonth?.name} Overview</h1>
        <ActiveMonthSelector />
      </div>
      <div className="flex gap-4">
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle className="flex justify-between text-lg">
              <h2>Cash Flow</h2>
              {data && data.net.total > 0 && (
                <div className="flex gap-2 text-emerald-500 items-center">
                  <TrendingUp />
                  <p className="font-semibold">
                    {formatCurrency(data?.net.total)}
                  </p>
                </div>
              )}
              {data && data.net.total === 0 && (
                <div className="flex gap-2 text-gray-500 items-center">
                  <MoveRight />
                  <p className="font-semibold">{formatCurrency(netSavings)}</p>
                </div>
              )}
              {data && data.net.total < 0 && (
                <div className="flex gap-2 text-red-500 items-center">
                  <TrendingDown />
                  <p className="font-semibold">
                    {formatCurrency(data?.net.total)}
                  </p>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="type"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="total" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle className="flex justify-between text-lg">
              <h2>Savings</h2>
              {netSavings > 0 && (
                <div className="flex gap-2 text-emerald-500 items-center">
                  <TrendingUp />
                  <p className="font-semibold">{formatCurrency(netSavings)}</p>
                </div>
              )}
              {netSavings === 0 && (
                <div className="flex gap-2 text-gray-500 items-center">
                  <MoveRight />
                  <p className="font-semibold">{formatCurrency(netSavings)}</p>
                </div>
              )}
              {netSavings < 0 && (
                <div className="flex gap-2 text-red-500 items-center">
                  <TrendingDown />
                  <p className="font-semibold">{formatCurrency(netSavings)}</p>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[90px]">
            <h3 className="text-xl font-bold">
              {formatCurrency(data?.savingsFunds.totalSavings ?? 0)}
            </h3>
          </CardContent>
          <CardFooter>
            <Link to="/savings" className="w-full">
              <Button variant="outline" className="w-full">
                {formatCurrency(data?.savingsFunds.totalSavings ?? 0)} to
                allocate
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle className="flex justify-between text-lg">
              <h2>Savings</h2>
              {netSavings > 0 && (
                <div className="flex gap-2 text-emerald-500 items-center">
                  <TrendingUp />
                  <p className="font-semibold">{formatCurrency(netSavings)}</p>
                </div>
              )}
              {netSavings === 0 && (
                <div className="flex gap-2 text-gray-500 items-center">
                  <MoveRight />
                  <p className="font-semibold">{formatCurrency(netSavings)}</p>
                </div>
              )}
              {netSavings < 0 && (
                <div className="flex gap-2 text-red-500 items-center">
                  <TrendingDown />
                  <p className="font-semibold">{formatCurrency(netSavings)}</p>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[90px]">
            <h3 className="text-xl font-bold">
              {formatCurrency(data?.savingsFunds.totalSavings ?? 0)}
            </h3>
          </CardContent>
          <CardFooter>
            <Link to="/savings" className="w-full">
              <Button variant="outline" className="w-full">
                {formatCurrency(data?.savingsFunds.unallocated ?? 0)} to
                allocate
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <h1 className="text-xl">Monthly Flow</h1>
      <Card className="">
        <MonthlyFlow />
      </Card>
      {/* <div>More trends here. How about bills/utilities?</div>
      <div>Focus group like groceries</div>
      <div>Unusual spending</div>
      <div>this month vs the past 6 months, or this month last year?</div> */}
      <h1 className="text-xl">Transactions</h1>
      <Card>
        <CardHeader>Income</CardHeader>
        <CardContent>
          <TransactionsTable
            data={incomeTransactions}
            totalRows={totalIncomeTransactions}
            fetchPage={() => {}}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>Spending</CardHeader>
        <CardContent>
          <TransactionsTable
            data={spendingTransactions}
            totalRows={totalSpendingTransactions}
            fetchPage={() => {}}
          />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default MonthlyPage;
