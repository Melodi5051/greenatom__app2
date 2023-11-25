import { observer } from "mobx-react-lite";
import { useState } from "react";
import { loginHelper } from "../helpers/auth.helper";
import { IDataLogin } from "../types/types";
import { authStore } from "../store/auth.store";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const handlePasswrodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlerLogin = () => {
    const userObj: IDataLogin = {
      username: login,
      password: password,
    };
    loginHelper(userObj);
  };
  return authStore.isAuth ? (
    <Navigate replace to={"/main"} />
  ) : (
    <div>
      <form action="">
        <div>
          <label htmlFor="login">Логин:</label>
          <input
            type="text"
            name="login"
            id="login"
            onChange={handleLoginChange}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input type="password" onChange={handlePasswrodChange} />
        </div>
      </form>
      <button onClick={() => handlerLogin()}>ВОЙТИ</button>
    </div>
  );
};
export default observer(Login);
