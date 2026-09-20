import styles from "../style";
import Footer from "./Footer";
import Navbar from "./Navbar";

const SiteLayout = ({ children }) => (
  <div className="bg-primary min-h-screen w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <Navbar />
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
