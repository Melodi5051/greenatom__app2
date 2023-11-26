import { observer } from "mobx-react-lite";
import { useState } from "react";
import { loginHelper } from "../helpers/auth.helper";
import { IDataLogin } from "../types/types";
import { authStore } from "../store/auth.store";
import { Link, Navigate } from "react-router-dom";
import style from "./../styles/login.module.scss";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const Login = () => {
  const handlerLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const obj = Object.fromEntries(form.entries()) as unknown as IDataLogin;
    console.log(obj);
    loginHelper(obj);
  };
  return authStore.isAuth ? (
    <Navigate replace to={"/"} />
  ) : (
    <div>
      <h2>Вход в систему</h2>
      <Link to={"/register"}>У меня нет аккаунта</Link>
      <form
        className={style.form}
        id="formElement"
        onSubmit={(e) => handlerLogin(e)}
      >
        <div>
          <label htmlFor="username">Логин</label>
          <Input
            type="text"
            placeholder="Введите логин..."
            id="username"
            name="username"
          />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <Input
            type="password"
            placeholder="Введите пароль..."
            name="password"
            autoComplete="on"
            id="password"
          />
        </div>
        <Button>ВОЙТИ</Button>
      </form>
    </div>
  );
};
export default observer(Login);
