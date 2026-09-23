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
          description="Explore professional instruments for extraction, restorative dentistry, diagnostics, endodontics, orthodontics, and complete dental sets — manufactured in Sialkot for international supply."
        />

        <section className="oem-content" aria-labelledby="dental-content-title" style={{ marginBottom: "48px" }}>
          <h2 id="dental-content-title" className={styles.heading2} style={{ marginBottom: "1.5rem" }}>
            Dental Instruments Manufactured for Professional Use
          </h2>
          <div className={`${styles.paragraph} oem-content__body`}>
            <p>
              Seamoon Industries manufactures a comprehensive range of dental instruments from our
              facility in Sialkot, Pakistan — the global centre of surgical and dental instrument
              production. Every instrument in our dental catalogue is produced from high-grade
              stainless steel, heat-treated for the correct hardness, and finished to the surface
              specification required for clinical use and repeated sterilisation cycles.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Our extraction forceps range covers English-pattern and American-pattern designs for
              upper and lower anteriors, premolars, molars, roots, and paediatric applications.
              Carbide-tipped beak options are available for improved grip on calcified roots. Root
              elevators and periotomes are produced in straight, left, and right configurations with
              handle options including hollow stainless steel, solid stainless steel, and
              autoclavable resin.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Restorative and diagnostic instrument sets include composite placement instruments,
              carvers, burnishers, explorers, probes, mirrors, and curettes. We supply individual
              instruments and pre-assembled sets configured for specific procedures — examination,
              composite restoration, scaling, and endodontic access. Cement spatulas, mixing
              spatulas, and amalgam carriers are available in single- and double-ended formats.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Orthodontic instruments include bracket placement forceps, band pushers, ligature
              directors, Weingart pliers, and wire-bending pliers. Rubber dam clamps cover the full
              range of anterior, premolar, and molar isolation requirements. Scalers and curettes
              are available in Gracey, universal, and sickle patterns with standard or extended
              shanks.
            </p>
            <p style={{ marginTop: "1rem" }}>
              All instruments are available for OEM and private-label programmes. We support custom
              handle engraving, colour-coded silicone rings, custom packaging, and procedure-set
              assembly. Instruments are produced under our ISO 13485 quality-management system and
              are available with CE marking for the European market and under our US FDA
              establishment registration for North American distribution.
            </p>
          </div>
        </section>

        <CatalogueGrid instruments={dentalInstruments} type="Dental Instruments" />

        <InternalPageLinks
          title="Continue exploring"
          links={[
            { to: "/", label: "Return to Seamoon Industries home" },
            { to: "/surgical-instruments", label: "Browse surgical instrument categories" },
            { to: "/oem-private-label", label: "Explore OEM and private-label manufacturing" },
            { to: "/certifications", label: "Review our certifications and quality standards" },
          ]}
        />
      </div>
    </div>
  </>
);

export default DentalInstruments;
