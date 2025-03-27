"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { merchantColumns } from "./columns";
import { FC, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@apollo/client";
import { GET_MERCHANT_KEYS } from "@/graphql/queries/getMerchantKeys";
import { Merchant, MerchantKey } from "@/graphql/__generated__/graphql";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMergeMerchantsForm } from "@/features/merchants/hooks/useMergeMerchantsForm";

type Props = {
  merchants: Merchant[];
};

export const MerchantKeysDataTable: FC<Props> = ({ merchants }) => {
  const { data } = useQuery(GET_MERCHANT_KEYS, {
    variables: {
      merchantIds: merchants.map((merchant) => merchant.id),
    },
    skip: merchants.length === 0,
  });
  const { keys, setKeys } = useMergeMerchantsForm();
  const [newKey, setNewKey] = useState("");
  const [sorting, setSorting] = useState<SortingState>([
    // { id: "include", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageSize: 100,
    pageIndex: 0,
  });

  const table = useReactTable({
    data: keys,
    columns: merchantColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const selectedKeysLength = table.getSelectedRowModel().rows.length;

  useEffect(() => {
    if (data?.merchantKeys) {
      const keys = data.merchantKeys as MerchantKey[];
      setKeys(keys);
    }
  }, [data?.merchantKeys]);

  useEffect(() => {
    const keys = table
      .getSelectedRowModel()
      .rows.map((row) => row.original) as MerchantKey[];
    setKeys(keys);
  }, [selectedKeysLength]);

  useEffect(() => {
    table.toggleAllPageRowsSelected(true);
  }, [keys]);

  return (
    <div className="w-full">
      <ScrollArea className="relative rounded-md border h-[calc(40vh)]">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={merchantColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Input
          placeholder="New mapping"
          value={newKey}
          onChange={(event) => setNewKey(event.target.value)}
        />
        <Button
        // onClick={() => setKeys((prev) => {
        //   [{ keyMatch: newKey }, ...prev]
        // })
        // }
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};
