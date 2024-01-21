import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authentificator } from "../store/auth2.store";
import { notificator } from "../store/notify.store";

type Props = { children: React.ReactNode };

const ProtectedRouter = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    authentificator.getMe()
    .then(content => console.log({...content}))
    .catch((error) => {
      notificator.push({children: `ERROR ${error}`});
      authentificator.refresh()
      .then(operationcode => {
        console.log(authentificator.isAuth())
      })
    })
  }, [])

  return (
    <div>
      {
        authentificator.isAuth() ? children : <Navigate replace to="/auth"/>
      }
    </div>
  )
};

export default observer(ProtectedRouter);
