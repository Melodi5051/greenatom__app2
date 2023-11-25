import React from "react";
import styles from './Header.module.scss';
import SvgIcon from '../../assets/svg/logo.svg'

const Header = () => {
  return <>
    <header>
      <div className={styles.divActions}>
        <div className={styles.divLogo}>
          <img src={SvgIcon} alt="" />
          <div className={styles.divLogoLabel}> 
            <p>гринатом<br /><span className={styles.divLogoLabelSublabel}>торговля и склад</span></p>
          </div>
        </div>

      </div>
    </header>
  </>
};

export default Header;
