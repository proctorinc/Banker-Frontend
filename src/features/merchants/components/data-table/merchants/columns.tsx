import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Merchant } from "@/graphql/__generated__/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MerchantLink } from "../../MerchantLink";

export const merchantColumns: ColumnDef<Merchant>[] = [
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
    accessorKey: "name",
    enableHiding: false,
    enableSorting: true,
    enableGlobalFilter: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Merchant
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <MerchantLink merchant={row.original} />,
  },
  {
    id: "keys",
    header: "Key mappings",
    enableHiding: false,
    enableSorting: false,
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <div className="w-[300px] overflow-clip space-x-1">
        {row.original.keys.length > 0 && (
          <Badge
            variant="secondary"
            className="font-light text-foreground font-mono"
          >
            {row.original.keys[0].keyMatch}
          </Badge>
        )}
        {row.original.keys.length > 2 && (
          <span className="text-xs">{`+${row.original.keys.length}`}</span>
        )}
      </div>
    ),
  },
  {
    id: "transactions",
    enableHiding: false,
    enableSorting: true,
    enableGlobalFilter: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transactions
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.transactions.pageInfo.totalCount}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    enableSorting: false,
    enableGlobalFilter: false,
    cell: ({ row }) => "edit",
    // <EditMerchantsButton className="h-6" merchantId={row.original.id} />
  },
];
