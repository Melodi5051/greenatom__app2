import SvgIcon from "../../assets/svg/logo.svg";
import LogoAtom from "../LogoAtom/LogoAtom";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className={styles.divActions}>
        <div className={styles.divLogo}>
          <div className={styles.divLogoLink}>
            <img src={SvgIcon} alt="" />
            <div className={styles.divLogoLabel}>
              <p>
                <span>росатом</span>
                <br />
                <span className={styles.divLogoLabelSublabel}>маркет</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;