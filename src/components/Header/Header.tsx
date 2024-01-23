import styles from "./Header.module.scss";
import SvgIcon from "../../assets/svg/logo.svg";
import Button from "../Button/Button";
import SvgWhiteUserIcon from "../../assets/svg/ui-white-user-profile.svg";
import SvgUserIcon from "../../assets/svg/ui-user-profile.svg";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { authentificator } from "../../store/auth2.store";

const Header = () => {
  
  const navigate = useNavigate();


  const handleLogout = () => {
    // removeTokenToLocalStorage("token");
    // removeTokenToLocalStorage("refreshToken");
    // removeCurrentPathToLocalStorage();
    authentificator.signout();
    navigate("/auth", {replace: true})
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
                  <span>росатом</span>
                  <br />
                  <span className={styles.divLogoLabelSublabel}>маркет</span>
                </p>
              </div>
            </Link>
            <div className={styles.divActionsButtons}>
              {/* {!!Object.keys(authentificator.constUserData).length ? ( */}
              {authentificator.isAuth() ? (
                <Navbar
                  handleLogout={handleLogout}
                />
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
