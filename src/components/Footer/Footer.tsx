import SvgIcon from '../../assets/svg/logo.svg'
import styles from "./Footer.module.scss";

const Footer = () => {
  return <footer>
    <div className={styles.divActions}>
      <div className={styles.divLogo}>
        <img src={SvgIcon} alt="" />
        <div className={styles.divLogoLabel}>
          <p>Гринатом<br /><span className={styles.divLogoLabelSublabel}>торговля и склад</span></p> 
        </div>
      </div>

      {/* <div className={styles.divActionsButtons}></div> */}

    </div>
  </footer>;
};

export default Footer;
