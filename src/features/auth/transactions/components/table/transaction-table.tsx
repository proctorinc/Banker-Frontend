import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import usePaginate from "@/hooks/usePaginate";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FC, useEffect } from "react";
import { Transaction } from "@/graphql/__generated__/graphql";
import { columns } from "./columns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

type Props = {
  data: Transaction[];
  totalRows: number;
  fetchPage: (pageSize: number, cursor: string | null) => void;
  loading: boolean;
  className?: string;
};

const TransactionsTable: FC<Props> = ({
  data,
  fetchPage,
  totalRows,
  loading,
  className,
}) => {
  const {
    pageSize,
    cursor,
    getNextPage,
    getPreviousPage,
    getFirstPage,
    getLastPage,
    setPaginationState,
    pageIndex,
  } = usePaginate();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Fetch data when pageSize or cursor change
  useEffect(() => {
    fetchPage(pageSize, cursor);
  }, [fetchPage, pageSize, cursor]);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPaginationState,
    manualPagination: true,
    rowCount: totalRows,
    state: {
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  type MonthHeaderProps = {
    index: number;
  };

  const MonthHeader: FC<MonthHeaderProps> = ({ index }) => {
    const current = table.getRowModel().rows[index];
    const previous = table.getRowModel().rows[index - 1];

    if (!current) {
      return <></>;
    }

    const currentDate = new Date(current?.original.date);
    const previousDate = new Date(previous?.original.date);

    if (
      !previous ||
      currentDate.getMonth() !== previousDate.getMonth() ||
      currentDate.getFullYear() !== previousDate.getFullYear()
    ) {
      return (
        <TableRow>
          <TableCell
            colSpan={6}
            className="text-center text-xs text-gray-500 bg-gray-100"
          >
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </TableCell>
        </TableRow>
      );
    }

    return <></>;
  };

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
      <div className="border rounded-xl overflow-hidden">
        {/* <Table className="relative">
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
        </Table> */}
        <ScrollArea className={cn("overflow-y-auto text-xs", className)}>
          <Table>
            <TableBody>
              {/* {loading && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="flex justify-center w-full bg-gray-100"
                  ></TableCell>
                </TableRow>
              )} */}
              {loading &&
                Array.from(
                  { length: table.getState().pagination.pageSize },
                  (_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="w-[40px] h-[20px] rounded-xl" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-[40px] h-[20px] rounded-xl" />
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
                table.getRowModel().rows.map((row, i) => (
                  <>
                    <MonthHeader key={`month-${i}`} index={i} />
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
                  </>
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
      </div>
      <DataTablePagination
        table={table}
        onNextPage={getNextPage}
        onPreviousPage={getPreviousPage}
        onFirstPage={getFirstPage}
        onLastPage={() => getLastPage(totalRows)}
      />
    </div>
  );
};

export default TransactionsTable;
