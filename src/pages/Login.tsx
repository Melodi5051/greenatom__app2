import { observer } from "mobx-react-lite";
import { IDataLogin } from "../types/userTypes";
import { Navigate, useNavigate } from "react-router-dom";
import ModalAuth from "../components/ModalAuth/ModalAuth";
import { authentificator } from "../store/auth2.store";
import { useState } from "react";

const Login = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const handlerLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const obj = Object.fromEntries(form.entries()) as unknown as IDataLogin;
    // loginHelper(obj);
    console.log(obj);
    
    
    const signInStatus = await authentificator.signin(obj);
    if (!signInStatus) {
      setIsAuth(true)
      console.log(signInStatus)
      navigate("/", {replace: true});
    } else throw Error("Ошибка входа")
  };
  return authentificator.isAuth() || isAuth ? (
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
