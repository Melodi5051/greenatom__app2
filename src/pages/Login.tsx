import { observer } from "mobx-react-lite";
import { useState } from "react";
import { loginHelper } from "../helpers/auth.helper";
import { IDataLogin } from "../types/types";
import { authStore } from "../store/auth.store";
import { Link, Navigate } from "react-router-dom";
import style from "./../styles/login.module.scss";
import Button from "../components/Button/Button";

const Login = () => {
  const handlerLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const obj = Object.fromEntries(form.entries()) as unknown as IDataLogin;
    loginHelper(obj);
  };
  return authStore.isAuth ? (
    <Navigate replace to={"/main"} />
  ) : (
    <div>
      <h2>Вход в систему</h2>
      <Link to={"/register"}>У меня нет аккаунта</Link>
      <form id="formElement" onSubmit={(e) => handlerLogin(e)}>
        <div>
          <label htmlFor="username">Логин</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Введите логин..."
          />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            id="password"
            placeholder="Введите пароль..."
          />
        </div>
        <Button>ВОЙТИ</Button>
      </form>
    </div>
  );
};
export default observer(Login);
