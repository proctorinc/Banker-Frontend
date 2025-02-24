import Layout from "@/app/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig;

const Home = () => {
  const { currentMonth } = useActiveMonths();
  const { error, data } = useQuery(GET_STATS, {
    variables: {
      startDate: currentMonth?.start,
      endDate: currentMonth?.end,
    },
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

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout title="Dashboard">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl prose">{currentMonth?.name} Overview</h1>
        <ActiveMonthSelector />
      </div>
      <Card className="w-[400px] aspect-video">
        <CardHeader>
          <CardTitle className="flex justify-between text-lg">
            <h2>Cash Flow</h2>
            {data && data.net.total >= 0 && (
              <div className="flex gap-2 text-emerald-500">
                <TrendingUp />
                <p className="font-semibold">
                  {formatCurrency(data?.net.total)}
                </p>
              </div>
            )}
            {data && data.net.total < 0 && (
              <div className="flex gap-2 text-red-500">
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
    </Layout>
  );
};

export default Home;
