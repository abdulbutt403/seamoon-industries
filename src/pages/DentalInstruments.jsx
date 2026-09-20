import styles from "../style";
import CatalogueGrid from "../components/CatalogueGrid";
import InternalPageLinks from "../components/InternalPageLinks";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { dentalInstruments } from "../data/catalogues";

const DentalInstruments = () => (
  <>
    <SEO path="/dental-instruments" />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <PageHero
          eyebrow="Dental catalogue"
          title="Precision Dental Instruments"
          description="Explore professional instruments for extraction, restorative dentistry, diagnostics, endodontics, orthodontics, and complete dental sets—manufactured in Sialkot for international supply."
        />
        <CatalogueGrid instruments={dentalInstruments} type="Dental Instruments" />
        <InternalPageLinks
          title="Continue exploring"
          links={[
            { to: "/", label: "Return to Seamoon Industries home" },
            { to: "/oem-private-label", label: "Explore OEM and private-label manufacturing" },
            { to: "/certifications", label: "Review our certifications and quality standards" },
          ]}
        />
      </div>
    </div>
  </>
);

export default DentalInstruments;
