import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SpendingHistory } from "@/graphql/__generated__/graphql";
import { FC, useMemo } from "react";
import { Bar, BarChart, ReferenceLine, XAxis } from "recharts";

type Props = {
  color: string;
  chartData: SpendingHistory[];
};

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function getAverageSpending(data: SpendingHistory[]): number {
  const nonZeroBalances = data
    .map((item) => item.balance)
    .filter((balance) => balance !== 0);

  const average =
    nonZeroBalances.length > 0
      ? nonZeroBalances.reduce((sum, val) => sum + val, 0) /
        nonZeroBalances.length
      : 0;

  return average;
}

export const MerchantHistoryBarChart: FC<Props> = ({ color, chartData }) => {
  const data = useMemo(() => {
    return chartData
      ? chartData.map((data) => {
          return {
            balance: Math.abs(data.balance),
            month: data.month,
          };
        })
      : [];
  }, [chartData]);

  return (
    <ChartContainer config={chartConfig} className="max-h-[100px] w-full">
      <BarChart accessibilityLayer data={data}>
        {data.length > 0 && (
          <>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="balance" fill={color} barSize={40} radius={4} />
            <ReferenceLine
              y={getAverageSpending(data)}
              stroke="lightgray"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="text-[0.6rem]"
              interval={0}
              tickFormatter={(date) => {
                const month = new Date(date);

                if (month.getFullYear() !== new Date().getFullYear()) {
                  return month.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  });
                } else {
                  return month.toLocaleDateString("en-US", {
                    month: "short",
                  });
                }
              }}
            />
          </>
        )}
      </BarChart>
    </ChartContainer>
  );
};
