import { MonthItem } from "@/graphql/__generated__/graphql";
import { GET_ACTIVE_MONTHS } from "@/graphql/queries";
import { client } from "@/lib/apollo-client";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getFirstAndLastDaysOfMonth } from "../utils";

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
  isLoading: boolean;
};

const ActiveMonthsContext = createContext<ActiveMonthsContext | null>(null);

export const ActiveMonthsContextProvider: FC<Props> = ({ children }) => {
  const [activeMonths, setActiveMonths] = useState<MonthItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<MonthItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    client
      .query({ query: GET_ACTIVE_MONTHS })
      .then((response) => response.data.months as MonthItem[])
      .then((months) => setActiveMonths(months))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (activeMonths.length > 0) {
      const monthParam = searchParams.get("month");
      console.log(monthParam);
      if (monthParam) {
        try {
          console.log(activeMonths);
          selectMonth(monthParam);
        } catch (error) {
          console.error(error);
          setSelectedMonth(activeMonths[0]);
          setSearchParams((prev) => {
            prev.delete("month");
            return prev;
          }); // Clear month query param
        }
      } else {
        setSelectedMonth(activeMonths[0]);
      }
    }
  }, [activeMonths]);

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
    isLoading,
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
