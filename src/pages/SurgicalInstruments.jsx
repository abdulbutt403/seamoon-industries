import styles from "../style";
import InternalPageLinks from "../components/InternalPageLinks";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

const SurgicalInstruments = () => (
  <>
    <SEO path="/surgical-instruments" />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <PageHero
          eyebrow="Surgical catalogue"
          title="Surgical Instruments Manufacturer & Exporter"
          description="Reusable surgical instruments for general, vascular, diagnostic and orthopaedic procedures. Manufactured in Sialkot, Pakistan for export and OEM programmes."
        />

        <section className="oem-content" aria-labelledby="surgical-content-title" style={{ marginBottom: "48px" }}>
          <h2 id="surgical-content-title" className={styles.heading2}>Reusable instruments for surgical procedures</h2>
          <div className={`${styles.paragraph} oem-content__body`}>
            <p>
              Seamoon Industries manufactures and exports reusable surgical instruments from
              Sialkot, Pakistan. The categories presented include general, vascular, diagnostic
              and orthopaedic instruments, as well as instruments for specialised procedures.
              This page introduces those groups so that distributors and other buyers can identify
              the area relevant to their enquiry. Product requirements differ across procedures,
              so buyers can refer to the catalogue and contact the export team with the category
              or item information they would like to discuss.
            </p>
            <h2>General and vascular instruments</h2>
            <p>
              General surgical instruments form a broad category within the range. Vascular
              instruments are presented as a separate group for buyers sourcing instruments for
              vascular procedures. The current catalogue provides item-level descriptions and
              references. An enquiry can identify the intended category, specific references
              where known, and whether individual instruments or an arranged group is being
              considered. Include details about the procedure area and the products being sourced
              to give the export team a useful starting point for the discussion.
            </p>
            <h2>Diagnostic, orthopaedic and specialised procedures</h2>
            <p>
              The surgical range also includes diagnostic and orthopaedic instruments, together
              with items for specialised procedures. These categories allow buyers to explore the
              catalogue by application. Product information should be checked against the current
              item descriptions when selecting an instrument. For questions about a particular
              product, an enquiry may include its catalogue reference and the destination market.
              Seamoon’s team can then respond to the specific request and discuss whether the
              instrument is available as a catalogue item or should be considered as part of an
              OEM programme.
            </p>
            <h2>Manufacturing, finishes and OEM supply</h2>
            <p>
              Seamoon describes a manufacturing process that moves from material selection through
              shaping, heat treatment, hand crafting, polishing and inspection. Stainless steel is
              among the materials described on the site; satin, mirror and titanium-coated finishes
              are listed. OEM and private-label services include custom design, material options,
              laser-etched branding and custom packaging. Buyers interested in surgical categories
              can use these services to raise requirements for an instrument or group of products.
              Contact the Sialkot export team with the category, references and market details
              relevant to the enquiry.
            </p>
            <h2>Product enquiries for export</h2>
            <p>
              Buyers can browse the listed surgical categories and contact Seamoon with questions
              about an item, reference or OEM requirement. The website describes the company’s
              work in dental and surgical instrument manufacturing and export from Sialkot,
              Pakistan. For a sourcing enquiry, name the category, provide a catalogue reference
              when available, and explain whether a particular finish, material or private-label
              service is being considered. This information helps keep product questions together
              with the manufacturing options that may be relevant to the request. Contact details
              are available on the export team page.
            </p>
          </div>
        </section>

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
