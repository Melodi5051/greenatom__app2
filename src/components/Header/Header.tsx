import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import SvgIcon from "../../assets/svg/logo.svg";
import Button from "../Button/Button";
import SvgWhiteUserIcon from "../../assets/svg/ui-white-user-profile.svg";
import SvgUserIcon from "../../assets/svg/ui-user-profile.svg";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/user.store";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SvgLogoutIcon from "../../assets/svg/ui-logout.svg";
import { authentificator } from "../../store/auth2.store";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(userStore.userRole);
  // }, [userStore.userRole]);

  const handleLogout = () => {
    // removeTokenToLocalStorage("token");
    // removeTokenToLocalStorage("refreshToken");
    // removeCurrentPathToLocalStorage();
    authentificator.signout();
    navigate("/auth", { replace: true })
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current!.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              {/* {!!Object.keys(authentificator.constUserData).length ? ( */}
              {authentificator.isAuth() ? (
                <div className={styles.listers}>
                  <div className={styles.userContainer} ref={dropdownRef}>
                    <Button viewtype="v3" onClick={toggleDropdown}>
                      {authentificator.constUserData.sub}
                    </Button>
                    {isDropdownOpen && (
                      <div className={styles.dropdownContent}>
                        <Navbar handleLogout={handleLogout} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <Link to={"/auth"}>
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
