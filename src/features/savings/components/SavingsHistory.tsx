import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSavingsPage } from "../hooks/useSavingsPage";
import { SavingsHistoryBar } from "./chart/SavingsHistoryBar";

export const SavingsHistory = () => {
  const { data } = useSavingsPage();

  const savingsData = data
    ? data.savingsHistory.map((monthData) => {
        return {
          type: `${monthData.month.substring(0, 3)} ${monthData.year}`,
          saved: monthData.saved,
          spent: Math.abs(monthData.spent),
        };
      })
    : [];

  return (
    <Card className="w-full">
      <CardHeader className="p-2 pb-0">
        <SavingsHistoryBar chartData={savingsData} />
      </CardHeader>
    </Card>
  );
};
