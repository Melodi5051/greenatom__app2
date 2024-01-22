import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { IEmployee } from "../../types/employerTypes";
import SvgLogoutIcon from "../../assets/svg/ui-logout.svg";
import { observer } from "mobx-react-lite";
import Loader from "../Loader/Loader";
import { authentificator } from "../../store/auth2.store";
import { ROUTES_BY_ROLE } from "../../router/router";
interface Navbar {
  handleLogout(): void;
}

const Navbar = ({ handleLogout }: Navbar) => {
  return <>
    {authentificator.gotUserData()
      ? ROUTES_BY_ROLE[`${authentificator.constUserData.role}`].map((arr: any, index: number) => {
        return (<Link key={index} to={arr.route}>
          <Button viewtype="text">{arr.name}</Button>
        </Link>)
      })
      : <Loader />
    }
    <Link to={"/profile"}>
      <Button viewtype="v3">{authentificator.constUserData.sub}</Button>
    </Link>
    <Button viewtype="text">
      <img src={SvgLogoutIcon} onClick={handleLogout} />
    </Button>
  </>
}

export default observer(Navbar);
