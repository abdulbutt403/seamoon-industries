import styles from "../style";
import Footer from "./Footer";
import Navbar from "./Navbar";
import LanguageSelector from "./LanguageSelector";

const SiteLayout = ({ children }) => (
  <div className="site-shell bg-primary min-h-screen w-full">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <Navbar />
        <LanguageSelector />
      </div>
    </div>

    <main>{children}</main>

    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <Footer />
      </div>
    </div>
  </div>
);

export default SiteLayout;
