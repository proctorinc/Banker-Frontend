import { Logo } from "@/components/logo/Logo";
import { MerchantLink } from "@/features/merchants/components/MerchantLink";
import { MerchantLogo } from "@/features/merchants/components/MerchantLogo";
import {
  Merchant,
  TransactionPreview,
  TransactionUpload,
} from "@/graphql/__generated__/graphql";
import { formatCurrency } from "@/utils/utils";
import { ColumnDef } from "@tanstack/react-table";

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
      // const merchant = row.original.merchant as MerchantUpload;
      // return row.original.transaction.duplicate?.merchant.name;
      console.log(row.original.transaction.duplicate?.merchant.name);
      return (
        <MerchantLogo merchant={row.original.transaction.duplicate?.merchant} />
      );
      // if (row.original.transaction.duplicate?.merchant.name) {
      //   <MerchantLink
      //     merchant={row.original.transaction.duplicate?.merchant}
      //   />;
      // } else if (row.original.merchant) {
      //   return `New: ${row.original.merchant.merchantName}`;
      // }
      // return "None";
    },
  },
  // {
  //   id: "type",
  //   header: "Type",
  //   cell: ({ row }) => {
  //     return <Badge variant="outline">{row.original.transaction.type}</Badge>;
  //   },
  // },
  {
    id: "amount",
    accessorKey: "Amount",
    cell: ({ row }) => {
      const transaction = row.original.transaction as TransactionUpload;

      if (
        transaction.duplicate &&
        transaction.duplicate.amount.toFixed(2) !==
          transaction.amount.toFixed(2)
      ) {
        console.log(
          transaction.duplicate.amount.toFixed(2),
          "!==",
          transaction.amount.toFixed(2),
        );
        return (
          <div className="space-x-1">
            <span className="text-muted-foreground line-through">
              {formatCurrency(transaction.amount, true)}
            </span>
            <span className="font-bold">
              {formatCurrency(transaction.duplicate.amount, true)}
            </span>
          </div>
        );
      }

      return (
        <span className="text-muted-foreground italic">
          {formatCurrency(transaction.amount, true)}
        </span>
      );
    },
  },
  {
    id: "description",
    accessorKey: "Description",
    enableGlobalFilter: true,
    cell: ({ row }) => {
      const transaction = row.original.transaction as TransactionUpload;

      if (
        transaction.duplicate &&
        transaction.duplicate.description !== transaction.description
      ) {
        return (
          <div className="space-y-1">
            <span className="text-muted-foreground line-through line-clamp-1 text-ellipsis">
              {transaction.description}
            </span>
            <span className="line-clamp-1 font-bold text-ellipsis">
              {transaction.description}
            </span>
          </div>
        );
      }

      return (
        <span className="text-muted-foreground italic line-clamp-1">
          {transaction.description}
        </span>
      );
    },
  },
  {
    id: "date",
    accessorKey: "Date",
    cell: ({ row }) => {
      const transaction = row.original.transaction as TransactionUpload;

      if (
        transaction.duplicate &&
        transaction.duplicate.date !== transaction.date
      ) {
        return (
          <div className="space-x-1">
            <span className="text-muted-foreground line-through">
              {new Date(transaction.duplicate.date).toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
              })}
            </span>
            <span className="font-bold">
              {new Date(transaction.date).toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
              })}
            </span>
          </div>
        );
      }

      return (
        <span className="text-muted-foreground italic">
          {new Date(transaction.date).toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  // {
  //   header: "Ignore",
  //   id: "ignore",
  //   cell: ({ row }) => {
  //     return (
  //       <Button
  //         onClick={() => toggleDisable(row.id)}
  //         variant={row.disabled ? "secondary" : "default"}
  //       >
  //         {row.disabled ? "Enable" : "Disable"}
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   header: "Actions",
  //   id: "actions",
  //   cell: () => (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="ghost" size="sm">
  //           <Ellipsis />
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent>
  //         <DropdownMenuItem>
  //           <NotebookPen className="h-3.5 w-3.5 text-muted-foreground/70" />
  //           Add note
  //         </DropdownMenuItem>
  //         <DropdownMenuItem>
  //           <Edit className="h-3.5 w-3.5 text-muted-foreground/70" />
  //           Edit
  //         </DropdownMenuItem>
  //         <DropdownMenuItem>
  //           <Trash2 className="h-3.5 w-3.5 text-muted-foreground/70" />
  //           Delete
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   ),
  // },
];
