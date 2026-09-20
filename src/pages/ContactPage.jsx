import styles from "../style";
import Contact from "../components/Contact";
import InternalPageLinks from "../components/InternalPageLinks";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

const ContactPage = () => (
  <>
    <SEO path="/contact" />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <PageHero
          eyebrow="Sales and export enquiries"
          title="Contact Seamoon Industries"
          description="Speak with our Sialkot team about dental and surgical instruments, export orders, OEM manufacturing, custom specifications, and private-label packaging."
        />
        <Contact />
        <InternalPageLinks
          title="Explore before enquiring"
          links={[
            { to: "/dental-instruments", label: "Browse dental instrument categories" },
            { to: "/surgical-instruments", label: "Browse surgical instrument categories" },
            { to: "/oem-private-label", label: "Review OEM and private-label services" },
          ]}
        />
      </div>
    </div>
  </>
);

export default ContactPage;
