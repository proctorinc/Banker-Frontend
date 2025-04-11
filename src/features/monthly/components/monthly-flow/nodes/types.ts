import { PrimaryIncomeFlow } from "@/graphql/__generated__/graphql";
import type { Node, BuiltInNode } from "@xyflow/react";

export type MerchantIncomeNode = Node<
  {
    primaryIncome: PrimaryIncomeFlow;
    handleLeft?: boolean;
    handleRight?: boolean;
    handleTop?: boolean;
    handleBottom?: boolean;
  },
  "merchant-income-node"
>;
export type BasicNode = Node<
  {
    label: string;
    value: number;
    handleLeft?: boolean;
    handleRight?: boolean;
    handleTop?: boolean;
    handleBottom?: boolean;
  },
  "basic-node"
>;
export type AppNode = BuiltInNode | MerchantIncomeNode | BasicNode;
