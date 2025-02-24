import { Navigate, Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import { Suspense } from "react";
import Accounts from "@/pages/accounts/Accounts";
import Transactions from "@/pages/transactions/Transactions";
import Account from "@/pages/accounts/Account";
import SavingsPage from "@/pages/savings/SavingsPage";
import { PaginationContextProvider } from "@/context/PaginationContext";
import SavingsPageContextProvider from "@/features/savings";
import UploadPage from "@/pages/upload/UploadPage";

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
        element: <Home />,
      },
      {
        path: "/savings",
        element: (
          <PaginationContextProvider>
            <SavingsPageContextProvider>
              <SavingsPage />
            </SavingsPageContextProvider>
          </PaginationContextProvider>
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
