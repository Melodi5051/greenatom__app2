import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRouter from "../components/ProtectedRouter";
import Main from "../components/Main/Main";
import React from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>ErrorPage</div>,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/main",
        element: (
          <ProtectedRouter>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Main />
            </React.Suspense>
          </ProtectedRouter>
        ),
      },
    ],
  },
]);
