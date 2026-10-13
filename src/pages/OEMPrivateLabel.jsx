import styles from "../style";
import InternalPageLinks from "../components/InternalPageLinks";
import OEMServices from "../components/OEMServices";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { oemFaqs as faqs } from "../data/faqs";

const OEMPrivateLabel = () => {
  return (
    <>
      <SEO path="/oem-private-label" />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={styles.boxWidth}>
          <PageHero
            eyebrow="Manufactured for your market"
            title="OEM & Private-Label Instrument Services"
            description="Build a dental or surgical instrument range around your specifications, materials, branding, packaging, and target market with support from design through production."
          />

          <section className="oem-content" aria-labelledby="oem-content-title">
            <h2 id="oem-content-title" className={styles.heading2} style={{ marginBottom: "1.5rem" }}>
              Why Source OEM Instruments from Sialkot?
            </h2>
            <div className={`${styles.paragraph} oem-content__body`}>
              <p>
                Sialkot, Pakistan has been the world's leading production centre for stainless-steel
                surgical and dental instruments for over a century. Seamoon Industries operates within
                this ecosystem, combining traditional forging and hand-finishing expertise with modern
                CNC machining, electro-polishing, and quality-management systems that meet international
                regulatory requirements.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Our OEM programme is designed for distributors, buying groups, hospital procurement
                teams, and instrument brands that need a reliable manufacturing partner rather than a
                catalogue supplier. We work from your drawings, samples, or concept brief and manage
                the full production chain — raw material sourcing, forging, machining, heat treatment,
                surface finishing, quality inspection, sterilisation packaging, and export documentation.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Private-label clients receive instruments that carry their own brand identity. We
                support laser engraving, electro-etching, custom colour coding, and full packaging
                design from individual peel pouches through to branded procedure sets and sterilisation
                trays. All instruments are produced under our ISO 13485 quality-management system with
                full batch traceability.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Whether you need 200 pieces of a custom extraction forceps for a regional dental chain
                or 10,000 units of a branded needle holder for a European distributor, our production
                planning team will provide a realistic schedule, competitive unit pricing, and a
                dedicated account contact throughout the order lifecycle.
              </p>
              <p style={{ marginTop: "1rem" }}>
                We also support regulatory compliance. For CE-marked instruments destined for the EU
                market we produce to EU MDR requirements and can supply technical files, declarations
                of conformity, and IFU documentation. For the US market, instruments are produced
                under our FDA registration. Our quality team can assist with the documentation your
                own regulatory submission may require.
              </p>
            </div>
          </section>

          <OEMServices />

          <section className="oem-faq" aria-labelledby="oem-faq-title" style={{ marginBottom: "64px" }}>
            <h2 id="oem-faq-title" className={styles.heading2} style={{ marginBottom: "2rem" }}>
              Frequently Asked Questions
            </h2>
            <dl className="faq-list">
              {faqs.map(({ question, answer }) => (
                <div key={question} className="faq-item">
                  <dt className="faq-item__question">{question}</dt>
                  <dd className="faq-item__answer">{answer}</dd>
                </div>
              ))}
            </dl>
          </section>

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
};

export default OEMPrivateLabel;
