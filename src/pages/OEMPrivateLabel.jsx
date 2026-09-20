import styles from "../style";
import InternalPageLinks from "../components/InternalPageLinks";
import OEMServices from "../components/OEMServices";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

const OEMPrivateLabel = () => (
  <>
    <SEO path="/oem-private-label" />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <PageHero
          eyebrow="Manufactured for your market"
          title="OEM & Private-Label Instrument Services"
          description="Build a dental or surgical instrument range around your specifications, materials, branding, packaging, and target market with support from design through production."
        />
        <OEMServices />
        <InternalPageLinks
          title="Explore products and standards"
          links={[
            { to: "/dental-instruments", label: "Browse dental instrument categories" },
            { to: "/surgical-instruments", label: "Browse surgical instrument categories" },
            { to: "/certifications", label: "Review certifications and quality standards" },
            { to: "/contact", label: "Discuss your OEM requirements" },
          ]}
        />
      </div>
    </div>
  </>
);

export default OEMPrivateLabel;
