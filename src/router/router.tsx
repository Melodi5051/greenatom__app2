import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>ErrorPage</div>,
    children: [
      {
        path: "/auth",
        element: <div>АВТОРИЗАЦИЯ</div>,
      },
      {
        path: "/main",
        element: <div>ГЛАВНАЯ СТРАНИЦА</div>,
      },
    ],
  },
]);
