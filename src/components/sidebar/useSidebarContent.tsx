import useUser from "@/features/auth/hooks/useUser";
import { Home, Landmark, PiggyBank, Receipt, Upload } from "lucide-react";
import { useLocation } from "react-router-dom";

export const useSidebarContent = () => {
  const currentUser = useUser();
  const { pathname } = useLocation();

  const data = {
    navMain: [
      {
        title: "Dashboard",
        icon: Home,
        url: "/",
        isActive: pathname === "/",
      },
      {
        title: "Savings",
        icon: PiggyBank,
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
          };
        }),
      },
      // {
      //   title: "Budgets",
      //   icon: PieChart,
      //   url: "/budgets",
      //   open: pathname.startsWith("/budgets"),
      // },
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
