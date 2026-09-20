import styles from "./style";
import { Business, CardDeal, Carousel, Certifications, ManufacturingProcess, OEMServices, ProductVideos, Stats, Hero } from "./components";
import CardDeal2 from "./components/CardDeal2";
import Contact from "./components/Contact";
import InternalPageLinks from "./components/InternalPageLinks";
import SEO from "./components/SEO";

const Home = () => (
  <>
    <SEO path="/" />

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
        <Certifications />
        <ManufacturingProcess />
        <OEMServices />
        <ProductVideos />
        <CardDeal />
        <CardDeal2 />
        <Contact/>
        <InternalPageLinks
          title="Explore Seamoon Industries"
          links={[
            { to: "/dental-instruments", label: "Browse our dental instrument range" },
            { to: "/surgical-instruments", label: "Browse our surgical instrument range" },
            { to: "/oem-private-label", label: "Discover OEM and private-label services" },
            { to: "/certifications", label: "Review certifications and quality standards" },
            { to: "/contact", label: "Contact our export team in Sialkot" },
          ]}
        />
      </div>
    </div>
  </>
);

export default Home;
