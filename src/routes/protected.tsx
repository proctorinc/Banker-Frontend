import { Navigate, Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import { Suspense } from "react";
import Accounts from "@/pages/accounts/Accounts";
import Transactions from "@/pages/transactions/Transactions";
import Account from "@/pages/accounts/Account";
import Savings from "@/pages/savings/Savings";

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
        element: <Savings />,
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
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
