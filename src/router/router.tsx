import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ProtectedRouter from "../components/ProtectedRouter";
import React from "react";
import Loader from "../components/Loader/Loader";
import ErrorPage from "../pages/ErrorPage";

const Login = React.lazy(() => import("../pages/Login"));
const Main = React.lazy(() => import("../components/Main/Main"));
// const Department = React.lazy(() => import("../pages/Department"));
const Product = React.lazy(() => import("../pages/Product"));
const Employer = React.lazy(() => import("../pages/Employee"));
// const Department = React.lazy(
//   () => import("../components/Department/Department")
// ); // Assuming you have a Department component Assuming you have a Documents component

// const Orders = React.lazy(() => import("../components/Orders/Orders")); // Assuming you have an Orders component
// const ProtectedRouter = React.lazy(
//   () => import("../components/ProtectedRouter")
// );

// по хорошему эти роуты и правила перехода по ролям должны быть в бэкенде и подтягиваться сюда через их API
// тогда админ их мог бы редактировать со своего профиля в специальном интерфейсе
export const ROUTES_BY_ROLE: any = {
  ROLE_ADMIN: [
    {route: "/employees", name: "Сотрудники"},
    {route: "/products", name: "Продукты"}
  ],
  ROLE_MANAGER: [
    {route: "/products", name: "Продукты"},
    {route: "/orders", name: "Заказы"},
    {route: "/cart", name: "Корзина"}
  ],
  ROLE_WAREHOUSE_WORKER: [
    {route: "/garage", name: "Склад"}
  ],
  ROLE_COURIER: [
    {route: "/delivery", name: "Доставка"}
  ],
  ROLE_SUPER_ADMIN: [
    {route: "/employees", name: "Сотрудники"},
    {route: "/products", name: "Продукты"},
    {route: "/orders", name: "Заказы"},
    {route: "/cart", name: "Корзина"},
    {route: "/garage", name: "Склад"},
    {route: "/delivery", name: "Доставка"}
  ],
  ROLE_UNDEFINED: [
    // роль без доступа к вкладкам
  ]
} as object

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth",
        element: (
          <React.Suspense fallback={<Loader />}>
            <Login />
          </React.Suspense>
        ),
      },
      // {
      //   path: "/register",
      //   element: (
      //     <React.Suspense fallback={<Loader />}>
      //       <Register />
      //     </React.Suspense>
      //   ),
      // },

      {
        path: "/",
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRouter>
              <Main />
            </ProtectedRouter>
          </React.Suspense>
        ),
      },
      {
        path: "/employees",
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRouter>
              <Employer />
            </ProtectedRouter>
          </React.Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRouter>
              <div>профиль</div>
            </ProtectedRouter>
          </React.Suspense>
        ),
      },
      // {
      //   path: "/департаменты",
      //   element: (
      //     <React.Suspense fallback={<Loader />}>
      //       <ProtectedRouter>
      //         <Department />
      //       </ProtectedRouter>
      //     </React.Suspense>
      //   ),
      // },
      {
        path: "/products",
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRouter>
              <Product />
            </ProtectedRouter>
          </React.Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <ProtectedRouter>
              <div>заказы</div>
            </ProtectedRouter>
          </React.Suspense>
        ),
      },
    ],
  },
]);
