import SvgIcon from "../../assets/svg/logo.svg";
import styles from "../Header/Header.module.scss";

const LogoAtom = () => {
    return (
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
    );
};

export default LogoAtom;