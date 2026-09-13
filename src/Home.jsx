import styles from "./style";
import { Business, CardDeal, Carousel, Footer, Navbar, Stats, Hero } from "./components";
import CardDeal2 from "./components/CardDeal2";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

const Home = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Carousel />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Business />
        <Gallery/>
        <CardDeal />
        <CardDeal2 />
        <Contact/>
        <Footer />
      </div>
    </div>
  </div>
);

export default Home;
