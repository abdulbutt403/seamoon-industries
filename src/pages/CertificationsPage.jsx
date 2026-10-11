import styles from "../style";
import Certifications from "../components/Certifications";
import InternalPageLinks from "../components/InternalPageLinks";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";

const certificationItems = [
  { id: "iso-13485", name: "ISO 13485", note: "Medical device quality management standard." },
  { id: "ce-mark", name: "CE Mark (EU MDR)", note: "CE Mark for the European Union Medical Device Regulation." },
  { id: "us-fda", name: "US FDA Registration", note: "United States Food and Drug Administration registration." },
  { id: "iso-9001", name: "ISO 9001:2015", note: "Quality management standard." },
  { id: "simap", name: "SIMAP", note: "Surgical Instruments Manufacturers Association of Pakistan." },
  { id: "scci", name: "SCCI", note: "Sialkot Chamber of Commerce and Industry." },
];

const CertificationsPage = () => (
  <>
    <SEO path="/certifications" />
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <div className="certification-page">
          <PageHero
            eyebrow="Quality and compliance"
            title="Certifications & Quality Standards"
            description="Seamoon Industries quality standards and certifications: ISO 13485, ISO 9001:2015, CE Mark (EU MDR), US FDA registration, SIMAP and SCCI."
          />

          <section className="oem-content" aria-labelledby="certification-content-title" style={{ marginBottom: "48px" }}>
            <h2 id="certification-content-title" className={styles.heading2}>Quality standards and registrations</h2>
            <div className={`${styles.paragraph} oem-content__body`}>
              <p>
                Seamoon Industries lists quality standards, market registrations and industry
                affiliations that relate to its dental and surgical instrument business. The list
                includes ISO 13485, ISO 9001:2015, CE Mark (EU MDR), US FDA Registration, SIMAP
                and SCCI. These names are provided here so buyers can identify the credentials
                relevant to a sourcing conversation. For certificate copies, current validity,
                registration details or precise scope, contact the company directly and request
                the documentation for the product and market under consideration.
              </p>
              <h2>Quality management in manufacturing</h2>
              <p>
                The manufacturing process described by Seamoon starts with material selection and
                continues through forging and shaping, heat treatment, hand crafting, polishing
                and inspection. Stainless steel is used, and satin, mirror and titanium-coated
                finishes are listed. ISO 13485 and ISO 9001:2015 appear among the company’s
                quality standards. Buyers reviewing a product can ask how the listed standards
                apply to the relevant manufacturing activity and request supporting documents
                before making a sourcing decision. This keeps the discussion tied to the buyer’s
                specific instrument category and the documentation needed for its market.
              </p>
              <h2>Market and industry registrations</h2>
              <p>
                The company also lists CE Mark (EU MDR) and US FDA Registration. The exact scope
                and supporting records can vary by instrument or market, so buyers should request
                the applicable information for their product and destination. SIMAP and
                SCCI are included as industry affiliations: Surgical Instruments Manufacturers
                Association of Pakistan and Sialkot Chamber of Commerce and Industry. Buyers may
                use the names as a guide when asking about Seamoon’s industry and export
                documentation. The company can respond to a request for the relevant records.
              </p>
              <h2>Requesting certification information</h2>
              <p>
                When requesting documentation, identify the standard or registration, the dental
                or surgical product category, and the intended destination market. If a specific
                certificate copy or number is needed, include that in the enquiry. The contact
                page provides the Seamoon Industries email address, telephone and WhatsApp details.
                The export team can then address the request using the information available for
                the relevant product. This page is a concise index of the standards and
                affiliations currently listed on the site, while product-specific documents and
                scope should be confirmed directly with Seamoon Industries.
              </p>
              <h2>Standards for buyers and distributors</h2>
              <p>
                Buyers comparing dental and surgical instrument suppliers often need to understand
                which quality standards, registrations and industry affiliations a manufacturer
                lists. Seamoon brings these names together on this page and on the certifications
                cards below. ISO 13485 and ISO 9001:2015 are presented as quality standards. CE Mark
                (EU MDR) and US FDA Registration are listed for market-related enquiries. SIMAP and
                SCCI identify the industry affiliations included in the company information. For a
                procurement review, use the relevant name as a starting point and request current
                product-specific documents from the export team. This provides buyers with a direct
                way to gather details for their own review and destination-market requirements.
              </p>
            </div>
          </section>

          <Certifications />
          <section className="certification-details" aria-labelledby="certification-details-title">
            <h2 id="certification-details-title">Listed standards and affiliations</h2>
            <dl>
              {certificationItems.map(({ id, name, note }) => (
                <div key={id} id={id} className="certification-detail-row" tabIndex="-1">
                  <dt>{name}</dt>
                  <dd>{note}</dd>
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
    </div>
  </>
);

export default CertificationsPage;
