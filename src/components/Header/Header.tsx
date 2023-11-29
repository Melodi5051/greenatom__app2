import React from "react";
import styles from "./Header.module.scss";
import SvgIcon from "../../assets/svg/logo.svg";
import Button from "../Button/Button";
import { authStore } from "../../store/auth.store";
import SvgWhiteUserIcon from "../../assets/svg/ui-white-user-profile.svg";
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
  return (
    <>
      <header>
        <div className={styles.divActions}>
          <div className={styles.divLogo}>
            <Link to={"/"}>
              <img src={SvgIcon} alt="" />
              <div className={styles.divLogoLabel}>
                <p>
                  <span>гринатом</span>
                  <br />
                  <span className={styles.divLogoLabelSublabel}>
                    торговля и склад
                  </span>
                </p>
              </div>
            </Link>
            <div className={styles.divActionsButtons}>
              {authStore.isAuth ? (
                <>
                  <Link to={"/сотрудники"}>
                    <Button viewtype="text">Сотрудники</Button>
                  </Link>
                  <Link to={"/документы"}>
                    <Button viewtype="text">Документы</Button>
                  </Link>
                  <Link to={"/заявки"}>
                    <Button viewtype="text">Заявки</Button>
                  </Link>
                  <Link to={"/профиль"}>
                    <Button viewtype="text">{userStore.user?.username}</Button>
                  </Link>
                  <Button viewtype="text">
                    <img src={SvgLogoutIcon} onClick={handleLogout} />
                  </Button>
                </>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default observer(Header);
