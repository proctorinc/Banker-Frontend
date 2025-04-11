import { CreateSavingsFundButton } from "./create-savings/CreateSavingsFundButton";
import { FundsTable } from "./data-grid/FundsTable";

export const FundsList = () => {
  return (
    <>
      <FundsTable />
      <div className="flex w-full items-center justify-between">
        <CreateSavingsFundButton />
      </div>
    </>
  );
};
