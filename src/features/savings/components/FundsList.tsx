import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateSavingsFundButton } from "./create-savings/CreateSavingsFundButton";
import { useSavingsPage } from "../hooks/useSavingsPage";
import { FundsTable } from "./data-grid/FundsTable";

export const FundsList = () => {
  const { fundsPagination } = useSavingsPage();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl prose">Funds</h1>
              <CreateSavingsFundButton />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <FundsTable />
        </CardContent>
      </Card>
      {fundsPagination.hasMore && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={() => fundsPagination.getNextPage()}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
};
