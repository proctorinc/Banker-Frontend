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
        open: true,
        isActive: pathname === "/",
      },
      {
        title: "Accounts",
        icon: Landmark,
        open: true,
        items: currentUser.accounts.edges.map(({ node: account }) => {
          return {
            title: account.name,
            url: `/account/${account.id}`,
          };
        }),
      },
      {
        title: "Transactions",
        icon: Receipt,
        url: "/transactions",
        open: pathname.startsWith("/transactions"),
      },
      {
        title: "Savings",
        icon: PiggyBank,
        url: "/savings",
        open: pathname.startsWith("/savings"),
      },
      {
        title: "Upload",
        icon: Upload,
        url: "#",
        open: false,
        items: [
          {
            title: "Chase Upload",
            url: "#",
          },
        ],
      },
    ],
  };

  return data;
};
