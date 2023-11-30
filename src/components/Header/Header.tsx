import React, {useEffect} from "react";
import styles from "./Header.module.scss";
import SvgIcon from "../../assets/svg/logo.svg";
import Button from "../Button/Button";
import { authStore } from "../../store/auth.store";
import SvgWhiteUserIcon from "../../assets/svg/ui-white-user-profile.svg";
import SvgBasket from "../../assets/svg/ui-basket.svg";
import SvgUserIcon from "../../assets/svg/ui-user-profile.svg";
import SvgLogoutIcon from "../../assets/svg/ui-logout.svg";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/user.store";
import {
  removeCurrentPathToLocalStorage,
  removeTokenToLocalStorage,
} from "../../helpers/localstorage.helper";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    removeTokenToLocalStorage("token");
    removeTokenToLocalStorage("refreshToken");
    removeCurrentPathToLocalStorage();
  };

  const handleNavMenu = () => {
    switch (userStore.userRole) {
      case "ROLE_ADMIN":
        return (
        <>
          <Link to={"/сотрудники"}>
            <Button viewtype="text">Сотрудники</Button>
          </Link>
          <Link to={"/продукты"}>
            <Button viewtype="text">Продукты</Button>
          </Link>
          <Link to={"/заказы"}>
            <Button viewtype="text">Заказы</Button>
          </Link>
          <Link to={"/профиль"}>
            <Button viewtype="admin">
              {userStore.user?.username}
              <img src={SvgWhiteUserIcon} />
            </Button>
          </Link>
          <Button viewtype="text" onClick={handleLogout}>
            Выйти
            <img src={SvgLogoutIcon} alt="Выйти"/>
          </Button>
        </>
      )
      case "ROLE_MANAGER":
        return (
            <>
              <Link to={"/продукты"}>
                <Button viewtype="text">Продукты</Button>
              </Link>
              <Link to={"/заказы"}>
                <Button viewtype="text">Заказы</Button>
              </Link>
              <Link to={"/корзина"}>
                <Button viewtype="text">
                  Корзина
                  <img src={SvgBasket} />
                </Button>
              </Link>
              <Link to={"/профиль"}>
                <Button viewtype="manager">
                  {userStore.user?.username}
                  <img src={SvgWhiteUserIcon} />
                </Button>
              </Link>
              <Button viewtype="text" onClick={handleLogout}>
                Выйти
                <img src={SvgLogoutIcon} alt="Выйти"/>
              </Button>
            </>
        )
      case "ROLE_COURIER":
        return (
          <>
            <Link to={"/доставка"}>
              <Button viewtype="text">Доставка</Button>
            </Link>
            <Link to={"/профиль"}>
              <Button viewtype="courier">
                {userStore.user?.username}
                <img src={SvgWhiteUserIcon} />
              </Button>
            </Link>
            <Button viewtype="text" onClick={handleLogout}>
              Выйти
              <img src={SvgLogoutIcon} alt="Выйти"/>
            </Button>
          </>
        )
      default:
        return (
            <>
              {/* <Link to={"/register"}>
                    <Button viewtype="text">Регистрация</Button>
                  </Link> */}
              <Link to={"/авторизация"}>
                <Button viewtype="v2">
                  Войти
                  <img src={SvgUserIcon} />
                  <img src={SvgWhiteUserIcon} />
                </Button>
              </Link>
            </>
        )
        break
    }
  }

  useEffect(() => {
    handleNavMenu()
    console.log(authStore.isAuth)
  }, [userStore.userRole])

  console.log("User role: ",userStore.userRole)
  return (
    <>
      <header>
        <div className={styles.divActions}>
          <div className={styles.divLogo}>
            <Link to={"/"}>
              <img src={SvgIcon} alt="" />
              <div className={styles.divLogoLabel}>
                <p>
                  <span>росатом</span>
                  <br />
                  <span className={styles.divLogoLabelSublabel}>
                    маркет
                  </span>
                </p>
              </div>
            </Link>
            <div className={styles.divActionsButtons}>
              {handleNavMenu()}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default observer(Header);
