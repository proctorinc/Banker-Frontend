import { Navigate, Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import { Suspense } from "react";
import Accounts from "@/pages/accounts/Accounts";
import Transactions from "@/pages/transactions/Transactions";
import Account from "@/pages/account/Account";
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
        element: <Home />,
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
