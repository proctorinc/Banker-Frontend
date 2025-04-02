import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MerchantKey } from "@/graphql/__generated__/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Squircle, X } from "lucide-react";

export const merchantColumns: ColumnDef<MerchantKey>[] = [
  {
    accessorKey: "keyMatch",
    enableHiding: false,
    enableSorting: true,
    enableGlobalFilter: true,
    size: 400,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Key
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="font-light text-foreground font-mono"
      >
        {row.original.keyMatch}
      </Badge>
    ),
  },
  {
    id: "include",
    cell: ({ row, table }) => {
      const isSelected = row.getIsSelected();
      return (
        <div className="flex justify-end px-3">
          <Button
            disabled={
              isSelected && table.getSelectedRowModel().rows.length === 1
            }
            className="w-6 h-6"
            size="icon"
            variant={isSelected ? "default" : "ghost"}
            onClick={() => {
              row.toggleSelected(!isSelected);
            }}
          >
            {isSelected ? <X size={15} /> : <Squircle size={15} />}
          </Button>
        </div>
      );
    },
  },
];
