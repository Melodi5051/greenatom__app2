import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ProtectedRouter from "../components/ProtectedRouter";
import React from "react";
import Loader from "../components/Loader/Loader";
import ErrorPage from "../pages/ErrorPage";

const Login = React.lazy(() => import("../pages/Login"));
const Main = React.lazy(() => import("../components/Main/Main"));
// const Department = React.lazy(() => import("../pages/Department"));
// const Product = React.lazy(() => import("../pages/Product"));
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

// поле description отображается на главной странице как подпись к названию страницы
export const ROUTES = {
  employees:  { route: "/employees", name: "Сотрудники", description: "Просмотр сотрудников, изменение учетных данных сотрудников" },
  products:   { route: "/products", name: "Продукты", description: "Редактирование продуктов и номенклатурных групп" },
  orders:     { route: "/orders", name: "Заказы", description: "Просмотр и управление заказами" },
  cart:       { route: "/cart", name: "Корзина", description: "Просмотр собственной корзины" },
  warehouse:  { route: "/warehouse", name: "Склад", description: "Учет товаров на складе" },
  delivery:   { route: "/delivery", name: "Доставка", description: "Оперирование статусами доставки" }
}

export const ROUTES_BY_ROLE: any = {
  ROLE_SUPER_ADMIN: [
    ROUTES.employees,
    ROUTES.products,
    ROUTES.orders,
    ROUTES.cart,
    ROUTES.warehouse,
    ROUTES.delivery,
  ],
  ROLE_ADMIN: [
    ROUTES.employees,
    ROUTES.products
  ],
  ROLE_MANAGER: [
    ROUTES.products,
    ROUTES.orders,
    ROUTES.cart
  ],
  ROLE_WAREHOUSE_WORKER: [
    ROUTES.warehouse
  ],
  ROLE_COURIER: [
    ROUTES.delivery
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
        path: ROUTES.employees.route,
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
      // {
      //   path: ROUTES.products.route,
      //   element: (
      //     <React.Suspense fallback={<Loader />}>
      //       <ProtectedRouter>
      //         <Product />
      //       </ProtectedRouter>
      //     </React.Suspense>
      //   ),
      // },
      {
        path: ROUTES.orders.route,
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
