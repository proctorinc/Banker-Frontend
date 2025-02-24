import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useActiveMonths from "@/features/activeMonths/hooks/useActiveMonths";
import { CreateSavingsFundButton } from "./create-savings/CreateSavingsFundButton";
import { SavingsChart } from "./chart/SavingsChart";
import { useSavingsPage } from "../hooks/useSavingsPage";
import ActiveMonthSelector from "@/features/activeMonths/components/ActiveMonthSelector";

export const SavingsInsights = () => {
  const { currentMonth } = useActiveMonths();
  const { data, fundsPagination } = useSavingsPage();

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl prose">{currentMonth?.name} Savings</h1>
        <ActiveMonthSelector />
      </div>
      <div className="flex gap-4 w-full">
        <Card className="flex flex-col flex-grow relative items-center justify-center">
          <CardHeader className="absolute top-0 w-full">
            <div className="flex w-full justify-between z-10">
              <div className="flex flex-col gap-2">
                <CardTitle>Total Savings</CardTitle>
                <CardDescription>
                  {fundsPagination.totalFunds} Funds
                </CardDescription>
              </div>
              <CreateSavingsFundButton />
            </div>
          </CardHeader>
          <SavingsChart />
        </Card>
        <div className="flex flex-col gap-5 w-[320px] text-lg">
          <Card>
            <CardHeader className="flex flex-row gap-5 items-center">
              <Badge
                variant="secondary"
                className="rounded-full w-16 h-16 items-center justify-center bg-emerald-400"
              >
                <TrendingUp size={25} className="text-emerald-800" />
              </Badge>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-emerald-800">
                  {formatCurrency(data?.stats.saved ?? 0)}
                </span>
                <span className="text-xs text-gray-600">Savings in</span>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-5 items-center">
              <Badge
                variant="secondary"
                className="rounded-full w-16 h-16 items-center justify-center bg-red-400"
              >
                <TrendingDown size={25} className="text-red-800" />
              </Badge>
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-red-800">
                  {formatCurrency(data?.stats.spent ?? 0)}
                </span>
                <span className="text-xs text-gray-600">Savings out</span>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-5 justify-between items-center">
              <div className="flex flex-row gap-5 items-center">
                <Badge
                  variant="secondary"
                  className="rounded-full w-16 h-16 items-center justify-center bg-yellow-400"
                >
                  <Coins size={25} className="text-yellow-800" />
                </Badge>
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold text-gray-800">
                    {formatCurrency(data?.stats.unallocated ?? 0)}
                  </span>
                  <span className="text-xs text-gray-600">Unallocated</span>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <ArrowRight />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  <p>Allocate leftover savings</p>
                </TooltipContent>
              </Tooltip>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};
