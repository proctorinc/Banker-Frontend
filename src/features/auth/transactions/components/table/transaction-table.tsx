import DataTable from "@/components/data-table/data-table";
import { FC, useEffect } from "react";
import { Transaction } from "@/graphql/__generated__/graphql";
import usePaginate from "@/hooks/usePaginate";
import { columns } from "./columns";

type Props = {
  data: Transaction[];
  totalRows: number;
  fetchPage: (pageSize: number, cursor: string | null) => void;
  loading: boolean;
};

const TransactionsTable: FC<Props> = ({
  data,
  totalRows,
  fetchPage,
  loading,
}) => {
  const {
    pageSize,
    cursor,
    getNextPage,
    getPreviousPage,
    getFirstPage,
    getLastPage,
  } = usePaginate();

  // Fetch data when pageSize or cursor change
  useEffect(() => {
    fetchPage(pageSize, cursor);
  }, [fetchPage, pageSize, cursor]);

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      rowCount={totalRows}
      onNextPage={getNextPage}
      onPreviousPage={getPreviousPage}
      onFirstPage={getFirstPage}
      onLastPage={() => getLastPage(totalRows)}
      loading={loading}
    />
  );
};

export default TransactionsTable;
