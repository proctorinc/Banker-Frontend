import { MonthItem } from "@/graphql/__generated__/graphql";
import { GET_ACTIVE_MONTHS } from "@/graphql/queries";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getFirstAndLastDaysOfMonth } from "../utils";
import { useQuery } from "@apollo/client";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
};

type ActiveMonthsContext = {
  months: MonthItem[];
  selectedMonth: MonthItem | null;
  selectMonth: (id: string) => void;
  isCurrentMonthSelected: () => boolean;
  selectCurrentMonth: () => void;
  hasNextMonth: () => boolean;
  hasPreviousMonth: () => boolean;
  selectNextMonth: () => void;
  selectPreviousMonth: () => void;
  loading: boolean;
};

const ActiveMonthsContext = createContext<ActiveMonthsContext | null>(null);

export const ActiveMonthsContextProvider: FC<Props> = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState<MonthItem | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, error, data } = useQuery(GET_ACTIVE_MONTHS);
  const activeMonths: MonthItem[] = data ? data?.months : [];

  useEffect(() => {
    const monthParam = searchParams.get("month");

    if (activeMonths.length > 0 && monthParam) {
      try {
        selectMonth(monthParam);
      } catch {
        setSelectedMonth(activeMonths[0]);

        // Delete invalid month query parameter
        setSearchParams((prev) => {
          prev.delete("month");
          return prev;
        });

        toast.warning(`'${monthParam}' is not a valid month`, {
          description: "Defaulting to most recent month",
          closeButton: true,
        });
      }
    } else {
      setSelectedMonth(activeMonths[0]);
    }
  }, [activeMonths]);

  if (error) {
    toast.error("Uh oh, an error occurred", {
      description: error.message,
      closeButton: true,
    });
  }

  function isCurrentMonthSelected() {
    const today = getCurrentMonth();

    return (
      !!selectedMonth &&
      today.name === selectedMonth.name &&
      today.year === selectedMonth.year
    );
  }

  function selectCurrentMonth() {
    const today = getCurrentMonth();

    selectMonth(today.id);
  }

  function hasNextMonth() {
    let hasNext = false;
    if (selectedMonth) {
      const currentMonthIndex = activeMonths.findIndex(
        (month) => month.id === selectedMonth.id,
      );

      hasNext = currentMonthIndex - 1 >= 0;
    }
    return hasNext;
  }

  function hasPreviousMonth() {
    let hasPrevious = false;
    if (selectedMonth) {
      const currentMonthIndex = activeMonths.findIndex(
        (month) => month.id === selectedMonth.id,
      );

      hasPrevious = currentMonthIndex + 1 < activeMonths.length;
    }
    return hasPrevious;
  }

  function selectNextMonth() {
    if (selectedMonth && hasNextMonth()) {
      const currentMonthIndex = activeMonths.findIndex(
        (month) => month.id === selectedMonth.id,
      );
      const nextMonth = activeMonths[currentMonthIndex - 1];
      selectMonth(nextMonth.id);
    }
  }

  function selectPreviousMonth() {
    if (selectedMonth && hasPreviousMonth()) {
      const currentMonthIndex = activeMonths.findIndex(
        (month) => month.id === selectedMonth.id,
      );
      const previousMonth = activeMonths[currentMonthIndex + 1];
      selectMonth(previousMonth.id);
    }
  }

  function getCurrentMonth(): MonthItem {
    const { first, last } = getFirstAndLastDaysOfMonth(new Date());
    const name = first.toLocaleString("en-US", { month: "long" });
    const year = last.toLocaleString("en-US", { year: "numeric" });

    return {
      id: `${name.substring(0, 3).toLowerCase()}-${year}`,
      name,
      year,
      start: first,
      end: last,
    };
  }

  function selectMonth(id: string) {
    console.log(id);
    const matches = activeMonths.filter((month) => month.id === id);

    if (matches.length > 0) {
      const month = matches[0];
      setSelectedMonth(month);
      setSearchParams({ month: month.id });
    } else {
      throw new Error("Invalid month");
    }
  }

  const contextData = {
    months: activeMonths,
    selectedMonth,
    selectMonth,
    loading,
    isCurrentMonthSelected,
    selectCurrentMonth,
    hasNextMonth,
    hasPreviousMonth,
    selectNextMonth,
    selectPreviousMonth,
  };

  return (
    <ActiveMonthsContext.Provider value={contextData}>
      {children}
    </ActiveMonthsContext.Provider>
  );
};

export default ActiveMonthsContext;
