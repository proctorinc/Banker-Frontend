import ActiveMonthSelector from "@/features/activeMonths/components/ActiveMonthSelector";
import useActiveMonths from "@/features/activeMonths/hooks/useActiveMonths";

export const SavingsTitle = () => {
  const { selectedMonth } = useActiveMonths();

  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="text-xl prose">
        {selectedMonth && `${selectedMonth.name} `}Savings
      </h1>
      <ActiveMonthSelector />
    </div>
  );
};
