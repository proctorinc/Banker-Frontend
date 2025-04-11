import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { FC } from "react";
import { BalanceHistory } from "@/graphql/__generated__/graphql";
import { formatCurrency } from "@/utils/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { cn } from "@/lib/utils";

type Props = {
  data: BalanceHistory[];
  color: string;
  className?: string;
};

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as BalanceHistory;

    return (
      <Card>
        <CardHeader className="p-3">
          <CardDescription className="font-semibold">
            {new Date(data.month).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            })}
          </CardDescription>
          <CardTitle>{formatCurrency(data.balance, true)}</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return null;
};

export const AccountBalanceHistoryChart: FC<Props> = ({
  data,
  color,
  className,
}) => {
  return (
    <ResponsiveContainer height={50} className={cn(className)}>
      <LineChart data={data}>
        {data.length > 0 && (
          <>
            <Tooltip
              key="balance"
              formatter={(value) => formatCurrency(value as number, true)}
              content={<CustomTooltip />}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke={color}
              strokeWidth={2}
              dot={false}
              animationBegin={0}
              animationDuration={750}
            />
            <ReferenceLine y={0} stroke="lightgray" strokeDasharray="3 3" />
          </>
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};
