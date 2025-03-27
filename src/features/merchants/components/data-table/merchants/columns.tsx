import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditMerchantsButton from "@/features/merchants/modal/EditMerchantModalButton";
import { Merchant } from "@/graphql/__generated__/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger className="text-left w-[200px] whitespace-nowrap overflow-clip overflow-ellipsis">
          {row.original.name}
        </TooltipTrigger>
        <TooltipContent side="bottom">{row.original.name}</TooltipContent>
      </Tooltip>
    ),
  },
  {
    id: "keys",
    header: "Key mappings",
    enableHiding: false,
    enableSorting: false,
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <div className="w-[300px] overflow-clip">
        {row.original.keys.map((key) => (
          <Badge
            key={key.id}
            variant="outline"
            className="font-light text-foreground font-mono"
          >
            {key.keyMatch}
          </Badge>
        ))}
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
    cell: ({ row }) => <EditMerchantsButton merchantId={row.original.id} />,
  },
];
