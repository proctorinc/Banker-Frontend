import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTablePagination } from "./data-table-pagination";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import usePaginate from "@/hooks/usePaginate";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number | undefined;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  loading?: boolean;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  onNextPage,
  onPreviousPage,
  onFirstPage,
  onLastPage,
  loading,
  className,
}: DataTableProps<TData, TValue>) {
  const { pageSize, pageIndex, setPaginationState } = usePaginate();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationState,
    manualPagination: true,
    rowCount,
    state: {
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  return (
    <div className="space-y-4">
      {/* <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Search..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> */}
      <ScrollArea
        className={cn("rounded-md border overflow-y-auto text-xs", className)}
      >
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-gray-50 w-full z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
            {loading &&
              Array.from(
                { length: table.getState().pagination.pageSize },
                (_, i) => (
                  <TableRow key={i}>
                    <TableCell className="flex justify-center">
                      <Checkbox className="bg-gray-50" disabled />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[80px] h-[20px] rounded-xl" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[200px] h-[20px] rounded-xl" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[100px] h-[20px] rounded-xl" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[200px] h-[20px] rounded-xl" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-[100px] h-[20px] rounded-xl" />
                    </TableCell>
                  </TableRow>
                ),
              )}
            {!loading &&
              table.getRowModel().rows?.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!loading && !table.getRowModel().rows?.length && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <DataTablePagination
        table={table}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onFirstPage={onFirstPage}
        onLastPage={onLastPage}
      />
    </div>
  );
}

export default DataTable;
