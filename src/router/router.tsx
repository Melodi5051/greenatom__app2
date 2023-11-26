import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ProtectedRouter from "../components/ProtectedRouter";
import React from "react";
import Loader from "../components/Loader/Loader";

const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Main = React.lazy(() => import("../components/Main/Main"));
const Document = React.lazy(() => import("../pages/Document"));
// const Department = React.lazy(
//   () => import("../components/Department/Department")
// ); // Assuming you have a Department component Assuming you have a Documents component

// const Orders = React.lazy(() => import("../components/Orders/Orders")); // Assuming you have an Orders component
// const ProtectedRouter = React.lazy(
//   () => import("../components/ProtectedRouter")
// );

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>ErrorPage</div>,
    children: [
      {
        path: "/login",
        element: (
          <React.Suspense fallback={<Loader />}>
            <Login />
          </React.Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <React.Suspense fallback={<Loader />}>
            <Register />
          </React.Suspense>
        ),
      },

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
        path: "/профиль",
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRouter>
              <div>профиль</div>
            </ProtectedRouter>
          </React.Suspense>
        ),
      },
      {
        path: "/департаменты",
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRouter>
              <div>департаменты</div>
            </ProtectedRouter>
          </React.Suspense>
        ),
      },
      {
        path: "/документы",
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRouter>
              <Document />
            </ProtectedRouter>
          </React.Suspense>
        ),
      },
      {
        path: "/заявки",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <ProtectedRouter>
              <div>заявки</div>
            </ProtectedRouter>
          </React.Suspense>
        ),
      },
    ],
  },
]);
