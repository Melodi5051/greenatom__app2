import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authentificator } from "../store/auth2.store";
import { notificator } from "../store/notify.store";
import Loader from "./Loader/Loader";

type Props = { children: React.ReactNode };

const ProtectedRouter = ({ children }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    authentificator.getMe()
    .then(content => console.log({...content}))
    .catch((error) => {
      notificator.push({children: `${error}`});
      navigate("/auth", {replace: true});
      // authentificator.refresh()
    })
  }, [])

  return (
    <div>
      {
        authentificator.gotUserData() ? children : <Loader />
      }
    </div>
  )
};

export default observer(ProtectedRouter);
