import { SmoothStepEdge, type Edge, type EdgeTypes } from "@xyflow/react";

export const initialEdges: Edge[] = [
  {
    id: "source-0-to-income",
    source: "income-0",
    target: "income",
    animated: true,
  },
  {
    id: "source-1-to-income",
    source: "income-1",
    target: "income",
    animated: true,
  },
  {
    id: "extra-income-to-income",
    source: "income-extra",
    target: "income",
    animated: true,
  },
  {
    id: "income-to-expenses-bills",
    source: "income",
    target: "expenses-bills",
    animated: true,
  },
  {
    id: "income-to-expenses-spending",
    source: "income",
    target: "expenses-spending",
    animated: true,
  },
  {
    id: "income-to-expenses-savings",
    source: "income",
    target: "savings",
    animated: true,
  },
  {
    id: "spending-to-bills",
    source: "expenses-bills",
    target: "expenses",
    animated: true,
  },
  {
    id: "spending-to-expenses",
    source: "expenses-spending",
    target: "expenses",
    animated: true,
  },
  // {
  //   id: "savings-to-expenses",
  //   source: "expenses-savings",
  //   target: "expenses",
  //   animated: true,
  // },

  {
    id: "expenses-to-leftover",
    source: "expenses",
    target: "leftover",
    animated: true,
    // type: "smoothstep",
    // style: { stroke: "red" },
  },
  // {
  //   id: "savings-to-savings",
  //   source: "expenses-savings",
  //   target: "savings",
  //   animated: true,
  //   // targetHandle: "top",
  // },
  // {
  //   id: "savings-withdraw-to-savings",
  //   source: "expenses-savings-withdraw",
  //   target: "savings",
  //   animated: true,
  //   // targetHandle: "top",
  // },
  {
    id: "savings-to-leftover",
    source: "savings",
    target: "leftover",
    animated: true,
    // targetHandle: "top",
  },
];

export const edgeTypes = {
  // Add your custom edge types here!
  SmoothStepEdge,
} satisfies EdgeTypes;
