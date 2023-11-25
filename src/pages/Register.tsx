import React from "react";
import { authStore } from "../store/auth.store";
import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";

const Register = () => {
  return authStore.isAuth ? (
    <Navigate replace to={"/main"} />
  ) : (
    <div>REGISTER</div>
  );
};

export default observer(Register);
