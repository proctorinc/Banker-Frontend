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
import useActiveMonths from "@/features/activeMonths/hooks/useActiveMonths";
import { Bar, BarChart, XAxis } from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CircleDollarSign, HandCoins, Sigma } from "lucide-react";

const chartConfig = {
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig;

const DashboardPage = () => {
  const { months } = useActiveMonths();

  const chartData = months.map((month, i) => {
    return {
      type: `${month.name} ${month.year}`,
      total: Math.floor(Math.random() * 101 + 100),
      fill: `hsl(var(--chart-${(i % 6) + 1}))`,
    };
  });

  const savingsData = months.map((month, i) => {
    return {
      type: `${month.name} ${month.year}`,
      total: Math.floor(Math.random() * 101 + 10 * i),
      fill: `hsl(var(--chart-2))`,
    };
  });

  return (
    <Layout title="Overview">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between text-lg">
            <h2>Cash Flow</h2>
            <ToggleGroup type="single">
              <ToggleGroupItem
                variant="outline"
                value="bold"
                aria-label="Toggle bold"
              >
                <HandCoins className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                variant="outline"
                value="italic"
                aria-label="Toggle italic"
              >
                <CircleDollarSign className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                variant="outline"
                value="underline"
                aria-label="Toggle underline"
              >
                <Sigma className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </CardTitle>
          <CardDescription>Spending</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between text-lg">
            <h2>Savings</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
            <BarChart accessibilityLayer data={savingsData}>
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

export default DashboardPage;
