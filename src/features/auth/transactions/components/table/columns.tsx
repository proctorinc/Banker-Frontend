import { ColumnDef } from "@tanstack/react-table";

import {
  Transaction,
  TransactionCategory,
} from "@/graphql/__generated__/graphql";
import { formatCurrency } from "@/utils/utils";
import CategoryIconSelector from "@/components/icons/CategoryIconSelector";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Ellipsis, NotebookPen, Trash2 } from "lucide-react";
import { MerchantLink } from "@/features/merchants/components/MerchantLink";

export const columns: ColumnDef<Transaction>[] = [
  // {
  //   id: "select",
  //   enableSorting: false,
  //   enableHiding: false,
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  // },
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
  {
    id: "category",
    accessorKey: "Category",
    cell: ({ row }) => {
      const transaction = row.original;
      const category = transaction.category as TransactionCategory | undefined;
      return (
        <div className="flex justify-center">
          <CategoryIconSelector
            transactionId={transaction.id}
            category={category}
          />
        </div>
      );
    },
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
    id: "merchant",
    accessorKey: "Merchant",
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      return <MerchantLink merchant={transaction.merchant} />;
    },
  },
  {
    id: "description",
    accessorKey: "Description",
    enableGlobalFilter: true,
    cell: ({ row }) => {
      const transaction = row.original as Transaction;
      return (
        <div className="text-xs line-clamp-1 font-light text-foreground font-mono text-ellipsis">
          {transaction.description}
        </div>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    // accessorKey: "Actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            // className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <NotebookPen className="h-3.5 w-3.5 text-muted-foreground/70" />
            Add note
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2 className="h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
