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
      <CardHeader></CardHeader>
      <CardContent>
        <SavingsHistoryBar chartData={savingsData} />
      </CardContent>
    </Card>
  );
};
