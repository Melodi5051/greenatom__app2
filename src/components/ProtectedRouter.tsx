import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authentificator } from "../store/auth2.store";
import { notificator } from "../store/notify.store";
import Loader from "./Loader/Loader";
import { ROUTES_BY_ROLE } from "../router/router";

type Props = { children: React.ReactNode };

const ProtectedRouter = ({ children }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(authentificator._tokenData())

    if (["ROLE_SUPER_ADMIN", "ROLE_ADMIN"].includes(authentificator._tokenData().role)) {
      authentificator.getMe()
      .then(content => {
        console.log({...content})
      })
      .catch((error) => {
        notificator.push({children: `${error}`});
        navigate("/auth", {replace: true});
      })
    } else {
      authentificator.saveUserData(authentificator._tokenData());
      navigate("/", {replace: true});
    }

  }, [])

  useEffect(() => {
    if (!window.navigator.onLine) notificator.push({children: "Вы отключены от интернета!", type: "warning"})
  }, [window.navigator.onLine])

  return (
    <div>
      {
        authentificator.gotUserData() ? children : <Loader />
      }
    </div>
  )
};

export default observer(ProtectedRouter);
