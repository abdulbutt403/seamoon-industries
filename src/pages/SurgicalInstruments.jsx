import styles from "../style";
import CatalogueGrid from "../components/CatalogueGrid";
import InternalPageLinks from "../components/InternalPageLinks";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { surgicalInstruments } from "../data/catalogues";

const SurgicalInstruments = () => (
  <>
    <SEO path="/surgical-instruments" />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <PageHero
          eyebrow="Surgical catalogue"
          title="Professional Surgical Instruments"
          description="Browse reusable surgical instruments for general, vascular, diagnostic, orthopaedic, and specialised procedures, available for international distribution and custom programmes."
        />
        <CatalogueGrid instruments={surgicalInstruments} type="Surgical Instruments" />
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

export default SurgicalInstruments;
