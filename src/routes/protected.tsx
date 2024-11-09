import { Navigate, Outlet } from "react-router-dom";
import Home from "@/pages/Home";
import { Suspense } from "react";

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
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
