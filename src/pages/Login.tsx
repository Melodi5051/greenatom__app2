import { observer } from "mobx-react-lite";
import { loginHelper } from "../helpers/auth.helper";
import { IDataLogin } from "../types/userTypes";
import { authStore } from "../store/auth.store";
import { Navigate } from "react-router-dom";
import ModalAuth from "../components/ModalAuth/ModalAuth";
import { notificator } from "../store/notify.store";
import { authentificator } from "../store/auth2.store";

const Login = () => {
  const handlerLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const obj = Object.fromEntries(form.entries()) as unknown as IDataLogin;
    // loginHelper(obj);
    console.log(obj);
    authentificator.signin(obj);
    notificator.push({children: "Тут должен быть логин"});
  };
  return authentificator.varAuthStatus ? (
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
