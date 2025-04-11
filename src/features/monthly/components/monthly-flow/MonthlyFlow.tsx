import { FC, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  BackgroundVariant,
  useReactFlow,
  Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import {
  FlowResponse,
  PrimaryIncomeFlow,
} from "@/graphql/__generated__/graphql";
import { AppNode } from "./nodes/types";

type Props = {
  flow?: FlowResponse;
  loading?: boolean;
};

export const MonthlyFlow: FC<Props> = ({ flow, loading }) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges],
  );

  useEffect(() => {
    if (flow) {
      setNodes(() => generateNodes(flow));
      setEdges(() => generateEdges(flow));
    }
  }, [flow]);

  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      fitView();
    }
  }, [nodes, edges]);

  return (
    <div className="relative border bg-gray-50/50 w-full h-[400px] rounded-xl overflow-clip">
      {!loading && nodes.length > 0 && edges.length > 0 && (
        <>
          <div className="absolute w-full h-full z-50"></div>
          <ReactFlow
            className="-z-10"
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            preventScrolling={true}
            nodesDraggable={false}
            fitView
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
          </ReactFlow>
        </>
      )}
    </div>
  );
};

function generateNodes(flow: FlowResponse): AppNode[] {
  const totalIncomeStreams = flow.primaryIncome.length;
  const incomeNodes = flow.primaryIncome.map((income, i) => {
    return createMerchantIncomeNode(i, income);
  });

  const additionalIncomeNode = createAdditionalIncomeNode(
    flow.additionalIncome,
    totalIncomeStreams,
  );

  const totalIncomeNode = createTotalIncomeNode(
    flow.total.income,
    totalIncomeStreams,
  );

  const spendingNodes = createSpendingNodes(totalIncomeStreams);

  return [
    ...incomeNodes,
    additionalIncomeNode,
    totalIncomeNode,
    ...spendingNodes,
  ];
}

function createMerchantIncomeNode(
  index: number,
  income: PrimaryIncomeFlow,
): AppNode {
  return {
    id: `${income.merchant.id}-income-node`,
    type: "merchant-income-node",
    position: { x: 0, y: index * 150 },
    data: {
      primaryIncome: income,
      handleRight: true,
    },
  };
}

function createAdditionalIncomeNode(
  totalIncome: number,
  totalIncomeSources: number,
): AppNode {
  return {
    id: "additional-income-node",
    type: "basic-node",
    position: { x: 0, y: totalIncomeSources * 150 },
    data: {
      label: "Additional Income",
      value: totalIncome,
      handleRight: true,
    },
  };
}

function createTotalIncomeNode(
  totalIncome: number,
  totalIncomeSources: number,
): AppNode {
  return {
    id: "total-income-node",
    type: "basic-node",
    position: { x: 300, y: (150 * totalIncomeSources) / 2 },
    data: {
      label: "Total Income",
      value: totalIncome,
      handleRight: true,
      handleLeft: true,
    },
  };
}

function createSpendingNodes(totalIncomeSources: number): AppNode[] {
  return [
    {
      id: "expenses-bills",
      type: "basic-node",
      position: { x: 600, y: (150 * totalIncomeSources) / 2 - 150 },
      data: {
        label: "Bills",
        value: -4560.01,
        handleLeft: true,
        handleRight: true,
      },
    },
    {
      id: "expenses-spending",
      type: "basic-node",
      position: { x: 600, y: (150 * totalIncomeSources) / 2 },
      data: {
        label: "Spending",
        value: -2448.99,
        handleLeft: true,
        handleRight: true,
      },
    },
    {
      id: "savings",
      type: "basic-node",
      position: { x: 600, y: (150 * totalIncomeSources) / 2 + 150 },
      data: {
        label: "Monthly savings",
        value: -1235.04,
        handleLeft: true,
        handleRight: true,
      },
    },
    {
      id: "expenses",
      type: "basic-node",
      position: { x: 900, y: (150 * totalIncomeSources) / 2 - 75 },
      data: {
        label: "Expenses",
        value: -4560.01 - 2448.99 - 1235.04,
        handleLeft: true,
        handleRight: true,
      },
    },
    {
      id: "leftover",
      type: "basic-node",
      position: { x: 1200, y: (150 * totalIncomeSources) / 2 + 25 },
      data: {
        label: "Leftover",
        value: 0,
        handleLeft: true,
      },
    },
  ];
}

function generateEdges(flow: FlowResponse): Edge[] {
  const incomeEdges = flow.primaryIncome.map((income) => {
    return createMerchantIncomeEdge(income);
  });
  const additionalIncomeEdge = createAdditionalIncomeEdge();
  const spendingEdges = createSpendingEdges();

  return [...incomeEdges, additionalIncomeEdge, ...spendingEdges];
}

function createMerchantIncomeEdge(income: PrimaryIncomeFlow): Edge {
  return {
    id: `${income.merchant.id}-income-edge`,
    source: `${income.merchant.id}-income-node`,
    target: "total-income-node",
    animated: true,
  };
}

function createAdditionalIncomeEdge(): Edge {
  return {
    id: `additional-income-edge`,
    source: "additional-income-node",
    target: "total-income-node",
    animated: true,
  };
}

function createSpendingEdges(): Edge[] {
  return [
    {
      id: "income-to-expenses-bills",
      source: "total-income-node",
      target: "expenses-bills",
      animated: true,
    },
    {
      id: "income-to-expenses-spending",
      source: "total-income-node",
      target: "expenses-spending",
      animated: true,
    },
    {
      id: "income-to-expenses-savings",
      source: "total-income-node",
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
    {
      id: "expenses-to-leftover",
      source: "expenses",
      target: "leftover",
      animated: true,
    },
    {
      id: "savings-to-leftover",
      source: "savings",
      target: "leftover",
      animated: true,
    },
  ];
}
