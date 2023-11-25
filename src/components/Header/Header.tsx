import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav>
        <Link to={"/login"}>Логин</Link>
        <Link to={"/register"}>Регистрация</Link>
        <Link to={"/main"}>Главная</Link>
      </nav>
    </div>
  );
};

export default Header;
