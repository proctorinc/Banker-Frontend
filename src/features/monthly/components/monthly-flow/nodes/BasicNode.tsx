import { type NodeProps } from "@xyflow/react";

import { type BasicNode } from "./types";
import { NodeLayout } from "./NodeLayout";
import { formatCurrency } from "@/utils/utils";

export function BasicNode({ data }: NodeProps<BasicNode>) {
  const { label, value, ...handleProps } = data;
  return (
    <NodeLayout title={label} {...handleProps}>
      {value > 0 && (
        <span className="font-semibold text-emerald-600">
          {formatCurrency(value, true)}
        </span>
      )}
      {value === 0 && (
        <span className="font-semibold text-gray-600">
          {formatCurrency(value, true)}
        </span>
      )}
      {value < 0 && (
        <span className="font-semibold text-red-600">
          {formatCurrency(value, true)}
        </span>
      )}
    </NodeLayout>
  );
}
