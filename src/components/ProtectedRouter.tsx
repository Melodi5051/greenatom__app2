import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { authStore } from "../store/auth.store";
import { observer } from "mobx-react-lite";

interface IProps {
  children: JSX.Element;
}
const ProtectedRouter: React.FC<IProps> = ({ children }) => {
  return (
    <div>{authStore.isAuth ? children : <Navigate replace to="/login" />}</div>
  );
};

export default observer(ProtectedRouter);
