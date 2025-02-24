import { MonthItem } from "@/graphql/__generated__/graphql";
import { GET_ACTIVE_MONTHS } from "@/graphql/queries";
import { client } from "@/lib/apollo-client";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  children: ReactNode;
};

type ActiveMonthsContext = {
  months: MonthItem[];
  currentMonth: MonthItem | null;
  selectMonth: (id: string) => void;
  isLoading: boolean;
};

const ActiveMonthsContext = createContext<ActiveMonthsContext | null>(null);

export const ActiveMonthsContextProvider: FC<Props> = ({ children }) => {
  const [activeMonths, setActiveMonths] = useState<MonthItem[]>([]);
  const [currentMonth, setCurrentMonth] = useState<MonthItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    client
      .query({ query: GET_ACTIVE_MONTHS })
      .then((response) => response.data.months as MonthItem[])
      .then((months) => {
        setActiveMonths(months);
        const monthParam = searchParams.get("month");
        if (monthParam) {
          try {
            selectMonth(monthParam);
          } catch {
            setCurrentMonth(months[0]);
            setSearchParams((prev) => {
              prev.delete("month");
              return prev;
            }); // Clear month query param
          }
        } else {
          setCurrentMonth(months[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  function selectMonth(id: string) {
    const matches = activeMonths.filter((month) => month.id === id);

    if (matches.length > 0) {
      const month = matches[0];
      setCurrentMonth(month);
      setSearchParams({ month: month.id });
    } else {
      throw new Error("Invalid month");
    }
  }

  const contextData = {
    months: activeMonths,
    currentMonth,
    selectMonth,
    isLoading,
  };

  return (
    <ActiveMonthsContext.Provider value={contextData}>
      {children}
    </ActiveMonthsContext.Provider>
  );
};

export default ActiveMonthsContext;
