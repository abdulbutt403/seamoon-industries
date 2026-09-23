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
          description="Browse reusable surgical instruments for general, vascular, diagnostic, orthopaedic, and specialised procedures — available for international distribution and custom OEM programmes."
        />

        <section className="oem-content" aria-labelledby="surgical-content-title" style={{ marginBottom: "48px" }}>
          <h2 id="surgical-content-title" className={styles.heading2} style={{ marginBottom: "1.5rem" }}>
            Surgical Instruments Built for Demanding Clinical Environments
          </h2>
          <div className={`${styles.paragraph} oem-content__body`}>
            <p>
              Seamoon Industries produces a broad range of reusable surgical instruments from our
              manufacturing facility in Sialkot, Pakistan. Our surgical catalogue covers general
              surgery, vascular surgery, orthopaedics, ENT, gynaecology, and diagnostic applications.
              Each instrument is forged or machined from surgical-grade stainless steel, heat-treated
              to the appropriate hardness specification, and finished to a standard that supports
              repeated autoclave sterilisation without degradation of function or surface integrity.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Our scissors range includes Mayo, Metzenbaum, iris, tenotomy, and vascular scissors in
              straight and curved configurations across multiple lengths. Tungsten-carbide insert
              scissors are available for extended cutting-edge life in high-volume environments.
              Tissue and dressing forceps include DeBakey, Adson, Gillies, and Bonney patterns with
              standard and tungsten-carbide working surfaces.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Needle holders are produced in Hegar, Mayo-Hegar, Olsen-Hegar, Crile-Wood, Castroviejo,
              and Jacobson configurations. Tungsten-carbide jaw inserts are standard on our premium
              range. Haemostatic forceps include Halsted mosquito, Kelly, Crile, Rochester-Pean, and
              Kocher patterns in straight and curved versions across the full clinical size range.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Retractors in our catalogue include Deaver, Richardson, Army-Navy, Weitlaner, and
              Gelpi self-retaining designs. Bone instruments cover periosteal elevators, bone
              curettes, rongeurs, and orthopaedic drill guides and sleeves for mini and standard
              fixation systems. Diagnostic instruments include adult and paediatric stethoscopes,
              percussion hammers, and supporting accessories.
            </p>
            <p style={{ marginTop: "1rem" }}>
              All surgical instruments are available for OEM and private-label supply. We support
              custom engraving, set assembly, sterilisation tray configuration, and branded
              packaging. Production runs under our ISO 13485 quality-management system with full
              batch traceability. CE-marked instruments are available for EU distribution and
              FDA-registered categories are available for the US market. Contact our export team
              to discuss specifications, MOQ, and lead times for your requirements.
            </p>
          </div>
        </section>

        <CatalogueGrid instruments={surgicalInstruments} type="Surgical Instruments" />

        <InternalPageLinks
          title="Continue exploring"
          links={[
            { to: "/", label: "Return to Seamoon Industries home" },
            { to: "/dental-instruments", label: "Browse dental instrument categories" },
            { to: "/oem-private-label", label: "Explore OEM and private-label manufacturing" },
            { to: "/certifications", label: "Review our certifications and quality standards" },
          ]}
        />
      </div>
    </div>
  </>
);

export default SurgicalInstruments;
