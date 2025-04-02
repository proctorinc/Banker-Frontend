import {
  MerchantUpload,
  TransactionPreview,
  TransactionUpload,
} from "@/graphql/__generated__/graphql";
import { formatCurrency } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Ellipsis, NotebookPen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const transactionPreviewColumns: ColumnDef<TransactionPreview>[] = [
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
    id: "merchant",
    accessorKey: "Merchant",
    cell: ({ row }) => {
      const merchant = row.original.merchant as MerchantUpload;
      return merchant.merchantName;
    },
  },
  {
    id: "amount",
    accessorKey: "Amount",
    cell: ({ row }) => {
      const transaction = row.original.transaction as TransactionUpload;
      return formatCurrency(transaction.amount, true);
    },
  },
  {
    id: "description",
    accessorKey: "Description",
    enableGlobalFilter: true,
    cell: ({ row }) => {
      const transaction = row.original.transaction as TransactionUpload;
      return (
        // <Input
        //   className="line-clamp-1"
        //   defaultValue={transaction.description}
        // />

        <div className="line-clamp-1">{transaction.description}</div>
      );
    },
  },
  {
    id: "date",
    accessorKey: "Date",
    cell: ({ row }) => {
      const transaction = row.original.transaction as TransactionUpload;
      return new Date(transaction.date).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
      });
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
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
