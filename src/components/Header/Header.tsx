import React, { useEffect } from "react";
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
import Navbar from "../Navbar/Navbar";

const Header = () => {
  const handleLogout = () => {
    removeTokenToLocalStorage("token");
    removeTokenToLocalStorage("refreshToken");
    removeCurrentPathToLocalStorage();
  };

  useEffect(() => {
    console.log(authStore.isAuth);
  }, [userStore.userRole]);

  console.log("User role: ", userStore.userRole);
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
                  <span className={styles.divLogoLabelSublabel}>маркет</span>
                </p>
              </div>
            </Link>
            <div className={styles.divActionsButtons}>
              {authStore.isAuth ? (
                <Navbar
                  userData={userStore.user}
                  handleLogout={handleLogout}
                  userRoutes={userStore.setRoutesByRole}
                />
              ) : (
                <>
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
