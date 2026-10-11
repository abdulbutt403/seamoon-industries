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
          title="Contact Our Export Team"
          description="Contact the Seamoon Industries export team in Sialkot, Pakistan for quotes, catalogues and OEM enquiries. WhatsApp, phone and email."
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
