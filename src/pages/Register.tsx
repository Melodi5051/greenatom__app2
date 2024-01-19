import React from "react";
import { authStore } from "../store/auth.store";
import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import ModalAuth from "../components/ModalAuth/ModalAuth";
import { IDataRegister } from "../types/userTypes";
import { notificator } from "../store/notify.store";
// import { registerHepler } from "../helpers/auth.helper";

const Register = () => {

  const handlerRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const obj = Object.fromEntries(form.entries()) as unknown as IDataRegister;
    // registerHepler(obj);
    notificator.push({children: "Тут должна быть регистрация"});
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
