import { observer } from "mobx-react-lite";
import { loginHelper } from "../helpers/auth.helper";
import { IDataLogin } from "../types/userTypes";
import { authStore } from "../store/auth.store";
import { Navigate, useNavigate } from "react-router-dom";
import ModalAuth from "../components/ModalAuth/ModalAuth";
import { notificator } from "../store/notify.store";
import { authentificator } from "../store/auth2.store";
import { useState } from "react";

const Login = () => {
  const [isAuth, setIsAuth] = useState(false);
  const handlerLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const obj = Object.fromEntries(form.entries()) as unknown as IDataLogin;
    // loginHelper(obj);
    console.log(obj);
    
    
    const signInStatus = await authentificator.signin(obj);
    if (!signInStatus) {
      
    } else throw Error("Ошибка входа")


    // .then(operationcode => setIsAuth(!operationcode))
    // .then(() => authentificator.getMe())
    // .then(() => console.log(authentificator.isAuth()))
    // .then(() => notificator.push({children: "Вы успешно вошли в аккаунт", type: "positive"}))
    // .catch(() => notificator.push({children: "Ошибка входа", type: "error"}))
  };
  return authentificator.isAuth() ? (
    <Navigate replace to={"/"} />
  ) : (
    <ModalAuth
      handlerAuth={handlerLogin}
      title={"ВХОД В СИСТЕМУ"}
      link={"У меня нету аккаунта"}
      path="register"
      type={"login"}
    />
  );
};
export default observer(Login);
