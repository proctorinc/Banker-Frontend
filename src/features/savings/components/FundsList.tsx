import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { PiggyBank } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useSavingsPage } from "@/features/savings";

export const FundsList = () => {
  const { data, fundsPagination } = useSavingsPage();

  return (
    <>
      <h1 className="text-xl">Funds</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 sm:grid-cols-3">
        {data?.funds.edges.map((edge) => {
          const fund = edge.node;
          return (
            <Card key={fund.id} className="hover:shadow-lg hover:bg-gray-50">
              <CardHeader>
                <CardTitle>
                  <div className="flex gap-2 items-center">
                    <PiggyBank />
                    {fund.name}
                  </div>
                </CardTitle>
                <CardDescription>
                  {formatCurrency(fund.total)}
                  {fund.goal !== 0 && (
                    <>
                      <span> / {formatCurrency(fund.goal)}</span>
                      <Progress value={33} />
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          );
        })}
      </div>
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
