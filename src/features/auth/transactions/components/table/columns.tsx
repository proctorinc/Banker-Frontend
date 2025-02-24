import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/graphql/__generated__/graphql";
import { formatCurrency } from "@/utils/utils";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "Merchant",
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      return <div className="line-clamp-1">{transaction.merchant.name}</div>;
    },
    size: 500,
  },
  {
    accessorKey: "Amount",
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      return (
        <div className="line-clamp-1">
          {formatCurrency(transaction.amount, true)}
        </div>
      );
    },
  },
  {
    accessorKey: "Description",
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      return <div className="line-clamp-1">{transaction.description}</div>;
    },
  },
  {
    accessorKey: "Date",
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      const date = new Date(transaction.date).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });

      return (
        <Badge variant="secondary">
          <div className="line-clamp-1">{date}</div>
        </Badge>
      );
    },
  },
];
