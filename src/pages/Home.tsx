import Layout from "@/app/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GET_STATS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig;

const Home = () => {
  const { loading, error, data } = useQuery(GET_STATS, {
    variables: {
      startDate: new Date("1/1/2024"),
      endDate: new Date("1/31/2024"),
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout title="Dashboard">
      <div className="flex flex-1 flex-col gap-8 p-8">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
              <CardDescription>
                <div className="flex justify-between">
                  <p>November 2024</p>
                  {data && data.net.total >= 0 && (
                    <div className="flex gap-2 text-emerald-500">
                      <TrendingUp />
                      <p>{data?.net.total}</p>
                    </div>
                  )}
                  {data && data.net.total < 0 && (
                    <div className="flex gap-2 text-red-500">
                      <TrendingDown />
                      <p>{data?.net.total}</p>
                    </div>
                  )}
                </div>
              </CardDescription>
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
          <div className="rounded-xl bg-muted/50" />
          <div className="rounded-xl bg-muted/50" />
          <div className="rounded-xl bg-muted/50" />
          <div className="rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </Layout>
  );
};

export default Home;
