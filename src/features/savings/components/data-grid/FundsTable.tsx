import { Progress } from "@/components/ui/progress";
import { useSavingsPage } from "../../hooks/useSavingsPage";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/utils";
import { MoveRight, TrendingDown, TrendingUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Logo } from "@/components/logo/Logo";

export const FundsTable = () => {
  const { data } = useSavingsPage();

  function getTextColor(amount: number) {
    if (amount > 0) {
      return "text-emerald-600";
    } else if (amount < 0) {
      return "text-red-600";
    }

    return "text-gray-600";
  }

  return (
    <div className="border rounded-xl overflow-hidden">
      <Table className="border-collapse rounded-xl">
        {/* <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="flex-2">Name</TableHead>
            <TableHead className="w-[400px]">Goal</TableHead>
            <TableHead className="text-right">This month</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader> */}
        <TableBody>
          {data?.funds.edges.map((edge) => {
            const fund = edge.node;
            return (
              <TableRow key={fund.id}>
                <TableCell className="flex items-center gap-2 font-medium whitespace-nowrap">
                  <Logo name={fund.name} /> {fund.name}
                </TableCell>
                <TableCell>
                  {!!fund.goal && (
                    <Tooltip>
                      <TooltipContent>
                        <span>
                          {formatCurrency(fund.total)} /{" "}
                          {formatCurrency(fund.goal)} -{" "}
                          {((fund.total / fund.goal) * 100).toFixed(0)}%
                        </span>
                      </TooltipContent>
                      <TooltipTrigger asChild>
                        <Progress
                          className="w-[200px]"
                          value={(fund.total / fund.goal) * 100}
                        />
                      </TooltipTrigger>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell
                  className={cn(
                    "flex gap-1 items-center justify-end",
                    getTextColor(fund.stats.net),
                  )}
                >
                  {fund.stats.net > 0 && <TrendingUp size={15} />}
                  {fund.stats.net < 0 && <TrendingDown size={15} />}
                  {fund.stats.net === 0 && <MoveRight size={15} />}
                  <span>{formatCurrency(fund.stats.net, true)}</span>
                </TableCell>
                <TableCell className="text-right w-[100px]">
                  {formatCurrency(fund.total, true)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
