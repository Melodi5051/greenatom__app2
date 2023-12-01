import React from "react";
import { authStore } from "../store/auth.store";
import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import ModalAuth from "../components/ModalAuth/ModalAuth";
import { IDataRegister } from "../types/userTypes";
// import { registerHepler } from "../helpers/auth.helper";

const Register = () => {

  const handlerRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const obj = Object.fromEntries(form.entries()) as unknown as IDataRegister;
    // registerHepler(obj);
  };

  return authStore.isAuth ? (
    <Navigate replace to={"/"} />
  ) : (
    <ModalAuth
      handlerAuth={handlerRegister}
      title={"РЕГИСТРАЦИЯ"}
      link={"У меня есть аккаунта"}
      path="login"
      type="register"
    />
  );
};

export default observer(Register);
