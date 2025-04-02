"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import { FC } from "react";
import { BalanceHistory } from "@/graphql/__generated__/graphql";

type Props = {
  data: BalanceHistory[];
};

export const AccountBalanceHistoryChart: FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer height={50} className="w-full px-5">
      <LineChart data={data}>
        {/* <Tooltip key="balance" formatter={(value) => formatCurrency(value)} /> */}
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#4F46E5"
          strokeWidth={2}
          dot={false}
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
