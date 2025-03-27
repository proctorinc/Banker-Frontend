import useUser from "@/features/auth/hooks/useUser";
import {
  Building2,
  Calendar,
  Coins,
  Landmark,
  PlaneTakeoff,
  Receipt,
  Upload,
} from "lucide-react";
import { useLocation } from "react-router-dom";

export const useSidebarContent = () => {
  const currentUser = useUser();
  const { pathname } = useLocation();

  const data = {
    navMain: [
      {
        title: "Overview",
        icon: PlaneTakeoff,
        url: "/",
        isActive: pathname === "/",
      },
      {
        title: "Monthly",
        icon: Calendar,
        url: "/monthly",
        isActive: pathname.startsWith("/monthly"),
      },
      {
        title: "Savings",
        icon: Coins,
        url: "/savings",
        isActive: pathname.startsWith("/savings"),
      },
      {
        title: "Accounts",
        icon: Landmark,
        open: true,
        items: currentUser.accounts.edges.map(({ node: account }) => {
          return {
            title: account.name,
            url: `/account/${account.id}`,
            isActive: pathname === `/account/${account.id}`,
            warning: isDaysOld(new Date(account.lastSync.date), 30),
          };
        }),
      },
      {
        title: "Merchants",
        icon: Building2,
        url: "/merchants",
        isActive: pathname.startsWith("/merchants"),
      },
      {
        title: "Transactions",
        icon: Receipt,
        url: "/transactions",
        isActive: pathname.startsWith("/transactions"),
      },
      {
        title: "Upload",
        icon: Upload,
        url: "/upload",
        isActive: pathname.startsWith("/upload"),
      },
    ],
  };

  return data;
};

function isDaysOld(date: Date, numberOfDays: number) {
  const DAY = 1000 * 60 * 60 * 24;
  const currentDate = Date.now();
  const timeDifference = currentDate - date.getTime();
  const daysDifference = Math.floor(timeDifference / DAY);
  return daysDifference >= numberOfDays;
}
