import React from "react";
import styles from "../Header/Header.module.scss";
import Button from "../Button/Button";
import { authentificator } from "../../store/auth2.store";
import { ROUTES_BY_ROLE } from "../../router/router";
import { Link } from "react-router-dom";

interface NavbarProps {
  handleLogout(): void;
}

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
  const currentRole = authentificator.constUserData.role;
  const routes = ROUTES_BY_ROLE[currentRole] || [];

  return (
    <>
      <Link to="/profile">
        <Button viewtype="text">Профиль</Button>
      </Link>
      <Link to="/">
        <Button viewtype="text">Главная</Button>
      </Link>
      {routes.map((route: any, index: number) => (
        <Link key={index} to={route.route}>
          <Button viewtype="text">{route.name}</Button>
        </Link>
      ))}
      <Button viewtype="text" onClick={handleLogout}>
        Выйти
      </Button>
    </>
  );
};

export default Navbar;
