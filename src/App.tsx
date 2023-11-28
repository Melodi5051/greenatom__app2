import { RouterProvider, useRoutes } from "react-router-dom";
import { router } from "./router/router";
import { observer } from "mobx-react-lite";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { authStore } from "./store/auth.store";
import { useEffect } from "react";

function App() {
  const checkAuth = async (): Promise<void> => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        authStore.setIsAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default observer(App);