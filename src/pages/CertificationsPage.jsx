import styles from "../style";
import Certifications from "../components/Certifications";
import InternalPageLinks from "../components/InternalPageLinks";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

const certificationDetails = [
  ["ISO 13485", "Quality-management standards supporting the manufacture of medical devices and instruments."],
  ["CE Mark (EU MDR)", "European regulatory conformity for applicable medical-device requirements."],
  ["US FDA Registration", "Registration supporting access to the United States medical-device market."],
  ["ISO 9001:2015", "A quality-management framework focused on consistent processes and continual improvement."],
  ["SIMAP", "Membership representing Pakistan's surgical instrument manufacturing sector."],
  ["SCCI", "Affiliation with the Sialkot Chamber of Commerce and Industry."],
];

const CertificationsPage = () => (
  <>
    <SEO path="/certifications" />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <PageHero
          eyebrow="Quality and compliance"
          title="Certifications & Quality Standards"
          description="Our quality systems and industry registrations support reliable manufacturing, traceable processes, and international supply."
        />
        <Certifications />
        <section className="certification-details" aria-labelledby="certification-details-title">
          <h2 id="certification-details-title">Standards Supporting Our Manufacturing</h2>
          <dl>
            {certificationDetails.map(([name, description]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </section>
        <InternalPageLinks
          title="Explore our capabilities"
          links={[
            { to: "/", label: "Return to Seamoon Industries home" },
            { to: "/dental-instruments", label: "Browse dental instrument categories" },
            { to: "/surgical-instruments", label: "Browse surgical instrument categories" },
            { to: "/oem-private-label", label: "Explore OEM and private-label services" },
          ]}
        />
      </div>
    </div>
  </>
);

export default CertificationsPage;
