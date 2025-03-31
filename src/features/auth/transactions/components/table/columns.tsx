import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/graphql/__generated__/graphql";
import { formatCurrency } from "@/utils/utils";
import CategoryIconSelector from "@/components/icons/CategoryIconSelector";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    id: "category",
    accessorKey: "Category",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className="flex justify-center">
          <CategoryIconSelector
            transactionId={transaction.id}
            category={transaction.category}
          />
        </div>
      );
    },
    size: 500,
  },
  {
    id: "merchant",
    accessorKey: "Merchant",
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      return (
        <Tooltip>
          <TooltipTrigger className="text-left w-fit whitespace-nowrap overflow-clip overflow-ellipsis">
            <Link
              to={`/merchant/${transaction.merchant.id}`}
              className="line-clamp-1"
            >
              <Button className="h-6" variant="ghost">
                {transaction.merchant.name}
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {transaction.merchant.name}
          </TooltipContent>
        </Tooltip>
      );
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
      return new Date(transaction.date).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
      });
    },
  },
];
