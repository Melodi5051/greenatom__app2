import React from "react";
import styles from './Header.module.scss';
import SvgIcon from '../../assets/svg/logo.svg'

const Header = () => {
  return <>
    <header>
      <div className={styles.divActions}>
        <div>
          <img src={SvgIcon} alt="" />
          <div>
            <p>ГРИНАТОМ<br />ТОРГОВЛЯ И СКЛАД</p>
          </div>
        </div>

      </div>
    </header>
  </>
};

export default Header;
