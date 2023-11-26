import { observer } from "mobx-react-lite";
import { loginHelper } from "../helpers/auth.helper";
import { IDataLogin } from "../types/userTypes";
import { authStore } from "../store/auth.store";
import { Navigate } from "react-router-dom";
import ModalAuth from "../components/ModalAuth/ModalAuth";

const Login = () => {
  const handlerLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const obj = Object.fromEntries(form.entries()) as unknown as IDataLogin;
    loginHelper(obj);
  };
  return authStore.isAuth ? (
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
