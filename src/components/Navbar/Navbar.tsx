import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { IEmployee } from "../../types/employerTypes";
import SvgLogoutIcon from "../../assets/svg/ui-logout.svg";
import { observer } from "mobx-react-lite";
import Loader from "../Loader/Loader";
import { authentificator } from "../../store/auth2.store";
interface Navbar {
  handleLogout(): void;
}

const Navbar = ({ handleLogout }: Navbar) => {
  return (
    <>
      {!authentificator.isAuth() ? (
        <Loader />
      ) : (
        <>
          {/* {userData &&
            Object.entries(userRoutes(userData.role.name)).map(
              (el: any, index: number) => (
                <Link key={index} to={el[1]}>
                  <Button viewtype="text">{el[0]}</Button>
                </Link>
              )
            )} */}

          {/* {
            userData && ROUTES_BY_ROLE[`${userData.role.name}`]
          } */}

          {
            
          }
          <Link to={"/profile"}>
            <Button viewtype="v3">{authentificator.constUserData.username}</Button>
          </Link>
          <Button viewtype="text">
            <img src={SvgLogoutIcon} onClick={handleLogout} />
          </Button>
        </>
      )}
    </>
  );
};

export default observer(Navbar);
