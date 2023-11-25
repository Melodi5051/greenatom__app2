import React from "react";
import styles from './Header.module.scss';
import SvgIcon from '../../assets/svg/logo.svg'
import Button from "../Button/Button";
import { authStore } from "../../store/auth.store";
import SvgWhiteUserIcon from "../../assets/svg/ui-white-user-profile.svg";
import SvgUserIcon from "../../assets/svg/ui-user-profile.svg";
import SvgWhiteLogoutIcon from "../../assets/svg/ui-white-logout.svg"
import SvgLogoutIcon from "../../assets/svg/ui-logout.svg";

const Header = () => {
  console.log(authStore.isAuth)
  return <>
    <header>
      <div className={styles.divActions}>
        <div className={styles.divLogo}>
          <img src={SvgIcon} alt="" />
          <div className={styles.divLogoLabel}>
            <p>гринатом<br /><span className={styles.divLogoLabelSublabel}>торговля и склад</span></p>
          </div>
        </div> 

        <div className={styles.divActionsButtons}>
          {authStore.isAuth
            ? <>
              <Button viewtype="text">
                username
                <img src={SvgLogoutIcon}/>
              </Button>
            </>
            : <>
              <Button viewtype="text">
                Регистрация
              </Button>
              <Button viewtype="v2">
                Войти
                <img src={SvgUserIcon}/>
                <img src={SvgWhiteUserIcon}/>
              </Button>
            </>
          }

        </div>

      </div>
    </header>
  </>
};

export default Header;
