import SvgIcon from "../../assets/svg/logo.svg";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={styles.divActions}>
        <div className={styles.divLogo}>
          <img src={SvgIcon} alt="" />
          <div className={styles.divLogoLabel}>
            <p>
              <span>росатом</span>
              <br />
              <span className={styles.divLogoLabelSublabel}>маркет</span>
            </p>
          </div>
        </div>

        <div className={styles.divActionsButtons}></div>
      </div>
    </footer>
  );
};

export default Footer;
