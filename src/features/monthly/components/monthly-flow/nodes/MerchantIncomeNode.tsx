import { type NodeProps } from "@xyflow/react";

import { type MerchantIncomeNode } from "./types";
import { NodeLayout } from "./NodeLayout";
import { formatCurrency } from "@/utils/utils";
import { MerchantLink } from "@/features/merchants/components/MerchantLink";

export function MerchantIncomeNode({ data }: NodeProps<MerchantIncomeNode>) {
  const { primaryIncome, ...handleProps } = data;
  const Title = <MerchantLink merchant={primaryIncome.merchant} />;

  return (
    <NodeLayout title={Title} {...handleProps}>
      {primaryIncome.income > 0 && (
        <span className="font-semibold text-emerald-600">
          {formatCurrency(primaryIncome.income, true)}
        </span>
      )}
      {primaryIncome.income === 0 && (
        <span className="font-semibold text-gray-600">
          {formatCurrency(primaryIncome.income, true)}
        </span>
      )}
      {primaryIncome.income < 0 && (
        <span className="font-semibold text-red-600">
          {formatCurrency(primaryIncome.income, true)}
        </span>
      )}
    </NodeLayout>
  );
}
