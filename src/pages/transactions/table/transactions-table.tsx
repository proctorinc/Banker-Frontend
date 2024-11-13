import DataTable from "@/components/data-table/data-table";
import { columns } from "./columns";
import { FC } from "react";
import { Transaction } from "@/graphql/__generated__/graphql";

type Props = {
  data: Transaction;
  pageCount: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

const TransactionsTable: FC<Props> = ({
  data,
  pageCount,
  onNextPage,
  onPreviousPage,
}) => {
  if (data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      pageCount={pageCount}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
    />
  );
};

export default TransactionsTable;
