import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Accounts from "@/pages/accounts/Accounts";
import Transactions from "@/pages/transactions/Transactions";
import Account from "@/pages/accounts/Account";
import SavingsPage, { SavingsPageProviders } from "@/features/savings";
import UploadPage from "@/pages/upload/UploadPage";
import MonthlyPage from "@/pages/monthly/MonthlyPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import { PaginationContextProvider } from "@/context/PaginationContext";

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/monthly",
        element: (
          <PaginationContextProvider>
            <MonthlyPage />
          </PaginationContextProvider>
        ),
      },
      {
        path: "/savings",
        element: (
          <SavingsPageProviders>
            <SavingsPage />
          </SavingsPageProviders>
        ),
      },
      {
        path: "/accounts",
        element: <Accounts />,
      },
      {
        path: "/account/:accountId",
        element: <Account />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/upload",
        element: <UploadPage />,
      },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
