import styles from "../style";
import Footer from "./Footer";
import Navbar from "./Navbar";
import MotionSystem from "../motion/MotionSystem";
import { logoLight } from "../assets";

const SiteLayout = ({ children }) => (
  <div className="bg-primary min-h-screen w-full overflow-hidden">
    <div className="motion-progress" aria-hidden="true" />
    <div className="motion-cursor" aria-hidden="true"><span className="motion-cursor__dot" /><span className="motion-cursor__ring" /></div>
    <div className="motion-intro" data-motion-gsap="true" aria-hidden="true"><img src={logoLight} alt="" width="1085" height="554" loading="lazy" /></div>
    <div className={`motion-header-shell ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <Navbar />
      </div>
    </div>
    <div className="motion-header-spacer" aria-hidden="true" />

    <main>{children}</main>
    <MotionSystem />

    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <Footer />
      </div>
    </div>
  </div>
);

export default SiteLayout;
