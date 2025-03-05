import type { NodeTypes } from "@xyflow/react";

import { PositionLoggerNode } from "./PositionLoggerNode";
import { AppNode } from "./types";

export const initialNodes: AppNode[] = [
  {
    id: "income-0",
    type: "position-logger",
    position: { x: 0, y: 0 },
    data: { label: "Matt - SCW", value: 4603.45, handleRight: true },
  },
  {
    id: "income-1",
    type: "position-logger",
    position: { x: 0, y: 100 },
    data: { label: "Annika - OHSU", value: 3450.22, handleRight: true },
  },
  {
    id: "income-extra",
    type: "position-logger",
    position: { x: 0, y: 200 },
    data: { label: "Other income", value: 345.2, handleRight: true },
  },
  {
    id: "income",
    type: "position-logger",
    position: { x: 200, y: 100 },
    data: {
      label: "Income",
      value: 4603.45 + 3450.22 + 345.2,
      handleRight: true,
      handleLeft: true,
    },
  },
  {
    id: "expenses-bills",
    type: "position-logger",
    position: { x: 400, y: 0 },
    data: {
      label: "Bills",
      value: -4560.01,
      handleLeft: true,
      handleRight: true,
    },
  },
  {
    id: "expenses-spending",
    type: "position-logger",
    position: { x: 400, y: 100 },
    data: {
      label: "Spending",
      value: -2448.99,
      handleLeft: true,
      handleRight: true,
    },
  },
  {
    id: "savings",
    type: "position-logger",
    position: { x: 400, y: 200 },
    data: {
      label: "Monthly savings",
      value: -1235.04,
      handleLeft: true,
      handleRight: true,
    },
  },
  // {
  //   id: "expenses-savings-withdraw",
  //   type: "position-logger",
  //   position: { x: 400, y: 300 },
  //   data: {
  //     label: "Savings withdraw",
  //     value: -204.5,
  //     handleRight: true,
  //   },
  // },
  {
    id: "expenses",
    type: "position-logger",
    position: { x: 600, y: 50 },
    data: {
      label: "Expenses",
      value: -4560.01 - 2448.99 - 1235.04,
      handleLeft: true,
      handleRight: true,
    },
  },
  {
    id: "leftover",
    type: "position-logger",
    position: { x: 800, y: 100 },
    data: {
      label: "Leftover",
      value: 4603.45 + 3450.22 + 345.2 + (-4560.01 - 2448.99 - 1235.04),
      handleLeft: true,
    },
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
