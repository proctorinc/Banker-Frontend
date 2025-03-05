import type { Node, BuiltInNode } from "@xyflow/react";

export type PositionLoggerNode = Node<
  {
    label: string;
    value: number;
    handleLeft?: boolean;
    handleRight?: boolean;
    handleTop?: boolean;
    handleBottom?: boolean;
  },
  "position-logger"
>;
export type AppNode = BuiltInNode | PositionLoggerNode;
