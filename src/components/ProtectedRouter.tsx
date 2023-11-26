import React from "react";
import { Navigate } from "react-router-dom";
import { authStore } from "../store/auth.store";
import { observer } from "mobx-react-lite";

type Props = { children: React.ReactNode };

const ProtectedRouter = ({ children }: Props) => {
  return (
    <div>{authStore.isAuth ? children : <Navigate replace to="/login" />}</div>
  );
};

export default observer(ProtectedRouter);
