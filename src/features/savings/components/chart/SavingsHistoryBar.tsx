import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FC } from "react";
import { Bar, BarChart, XAxis } from "recharts";

type SavingsChartDatapoint = {
  type: string;
  saved: number;
  spent: number;
};

type Props = {
  chartData: SavingsChartDatapoint[];
};

const chartConfig = {
  saved: {
    label: "Saved",
    color: "hsl(var(--chart-2))",
  },
  spent: {
    label: "Spent",
    color: `hsl(var(--chart-1))`,
  },
} satisfies ChartConfig;

export const SavingsHistoryBar: FC<Props> = ({ chartData }) => {
  return (
    <ChartContainer config={chartConfig} className="max-h-[100px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis dataKey="type" tickLine={false} axisLine={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="saved" fill="var(--color-saved)" radius={4} />
        <Bar dataKey="spent" fill="var(--color-spent)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
