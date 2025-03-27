import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/graphql/__generated__/graphql";
import { formatCurrency } from "@/utils/utils";
import CategoryIconSelector from "@/components/icons/CategoryIconSelector";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "category",
    accessorKey: "Category",
    cell: ({ row }) => {
      const transaction = row.original;
      return <CategoryIconSelector category={transaction.category} />;
    },
    size: 500,
  },
  {
    id: "merchant",
    accessorKey: "Merchant",
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      return <div className="line-clamp-1">{transaction.merchant.name}</div>;
    },
    size: 500,
  },
  {
    id: "amount",
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
    id: "description",
    accessorKey: "Description",
    enableGlobalFilter: true,
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      return <div className="line-clamp-1">{transaction.description}</div>;
    },
  },
  {
    id: "date",
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
